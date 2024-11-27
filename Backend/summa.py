from fastapi import FastAPI, HTTPException
from pydantic import BaseModel,Field
from typing import List, Dict
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from together import Together
import re  # Import regular expression module for better parsing
import logging
from collections import defaultdict

logging.basicConfig(level=logging.INFO)

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust based on your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store self-assessment data temporarily (for demonstration purposes)
self_assessment_data = {}
employee_progress = defaultdict(lambda: {"skills": {}, "total_score": 0, "total_attempts": 0, "star_rating": 0})

  # List of learning goal questions with correct answers

# Define the request payload model
class SelfAssessmentRequest(BaseModel):
    employee_name: str
    role: str
    current_project: str
    assessment_date: str
    current_skills: List[str]

# Define the response model for self-assessment
class SelfAssessmentResponse(BaseModel):
    message: str
    learning_plan: Dict[str, List[str]]

# Define the response model for learning goals
class LearningGoalsResponse(BaseModel):
    skills: List[str]

# Define data models
class QuizRequest(BaseModel):
    skill: str
    difficulty: str

class Question(BaseModel):
    question: str
    options: List[str]

class QuizResponse(BaseModel):
    questions: List[Question]
    answers: List[str]

class SubmitQuizRequest(BaseModel):
    employee_name: str
    skill: str
    level: str
    submitted_answers: Dict[str, str]  # User's answers keyed by question text

class QuizSubmissionRequest(BaseModel):
    employee_name: str
    skill: str
    level: str
    submitted_answers: List[str]  # Submitted answers by the user

quiz_answers = {}  # Store correct answers for quizzes

class QuizScoreRequest(BaseModel):
    employee_name: str
    skill: str
    level: str
    submitted_answers: List[str]

# Assuming you have a global variable for employee progress
employee_progress = {}

# Initialize the Together client with API Key
api_key = "1121e34f5ab31666f0c57095d74d11043c960e9fdcda8f92bb6f7b88395e8776"  # Set your API key directly here
client = Together(api_key=api_key)

@app.post("/self_assessment/", response_model=SelfAssessmentResponse)
async def self_assessment(data: SelfAssessmentRequest):
    # Create a prompt for the model
    prompt = f"""
    Create a personalized learning plan for a {data.role} working on a project titled "{data.current_project}".
    The employee currently has the following skills: {', '.join(data.current_skills)}.

    Please include:
    - A list of skills to learn (at least 3 and at most 5)(no explanation needed just list down the skills alone)
    - Specific goals to achieve (only 2)(no explanation needed just list down the goals alone)
    - Learning resources (books, courses, articles, etc.) (only 2) with proper links(no explanation needed just list down the resources alone)
    - Challenges to apply the learned skills (only 2)(no explanation needed just list down the challenges alone)

    Respond with the following structure:
    Skills: [list of skills]
    Goals: [list of goals]
    Resources: [list of resources]
    Challenges: [list of challenges]
    """

    try:
        # Call the Together API to get the learning plan
        response = client.chat.completions.create(
            model="meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=512,
            temperature=0.7,
            top_p=0.9,
            top_k=50,
            repetition_penalty=1,
            stop=["<|eot_id|>", "<|eom_id|>"],
            stream=False
        )

        # Print the raw model response for debugging
        model_response_content = response.choices[0].message.content.strip()
        print("Model Response:", model_response_content)

        # If the content is empty, raise an exception
        if not model_response_content:
            raise HTTPException(status_code=400, detail="No learning plan generated. Please try again.")

        # Convert the learning plan content into a structured dictionary
        learning_plan = parse_learning_plan(model_response_content)

        # Store the self-assessment data
        self_assessment_data[data.employee_name] = learning_plan

        # Prepare the response
        response_data = {
            "message": "Self-assessment data saved successfully",
            "learning_plan": learning_plan
        }
        return response_data

    except ValueError as ve:
        # Log specific parsing errors
        raise HTTPException(status_code=400, detail=f"Parsing Error: {str(ve)}")
    except Exception as e:
        # Catch other errors and return a general error message
        raise HTTPException(status_code=500, detail=f"Error generating learning plan: {str(e)}")

@app.get("/learning_goals/{employee_name}", response_model=LearningGoalsResponse)
async def learning_goals(employee_name: str):
    """
    Fetch the target skills for the specified employee.
    """
    if employee_name not in self_assessment_data:
        raise HTTPException(status_code=404, detail="Employee not found or has not completed self-assessment.")

    learning_plan = self_assessment_data[employee_name]
    return {"skills": learning_plan["skills"]}

def parse_learning_plan(content: str) -> Dict[str, List[str]]:
    """
    Parse the learning plan content from the provided text.
    The parser assumes the content is structured with clear headings.
    """
    # Initialize the learning plan dictionary
    learning_plan = {
        "skills": [],
        "goals": [],
        "resources": [],
        "challenges": []
    }

    # Use regular expressions to find the sections more robustly
    skills_match = re.search(r"Skills:\s*([\s\S]*?)(?=Goals:|$)", content)
    goals_match = re.search(r"Goals:\s*([\s\S]*?)(?=Resources:|$)", content)
    resources_match = re.search(r"Resources:\s*([\s\S]*?)(?=Challenges:|$)", content)
    challenges_match = re.search(r"Challenges:\s*([\s\S]*)", content)

    # Function to clean up each item by removing leading numbers and extra content
    def clean_items(items: List[str]) -> List[str]:
        cleaned_items = []
        for item in items:
            # Remove leading numbers with optional space and formatting (e.g., "1.", "2.", etc.)
            cleaned_item = re.sub(r'^\d+\.\s*', '', item).strip()
            if cleaned_item:  # Add only if it's not empty
                cleaned_items.append(cleaned_item)
        return cleaned_items

    # Extract and clean matched content
    if skills_match:
        skills = skills_match.group(1).strip().split("\n")
        learning_plan["skills"] = clean_items(skills)
    if goals_match:
        goals = goals_match.group(1).strip().split("\n")
        learning_plan["goals"] = clean_items(goals)
    if resources_match:
        resources = resources_match.group(1).strip().split("\n")
        learning_plan["resources"] = clean_items(resources)
    if challenges_match:
        challenges = challenges_match.group(1).strip().split("\n")
        learning_plan["challenges"] = clean_items(challenges)

    return learning_plan

@app.post("/generate_quiz/", response_model=QuizResponse)
async def generate_quiz(data: QuizRequest):
    prompt = f"""
    Generate 10 multiple-choice questions for a {data.difficulty} level quiz on the skill {data.skill}.
    Provide 4 options for each question, with one correct answer.
    Respond in this format:
    Questions: [list of questions with options]
    Answers: [list of correct answers]
    """

    try:
        response = client.chat.completions.create(
            model="meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1024,
            temperature=0.7,
            top_p=0.9,
            top_k=50,
            repetition_penalty=1,
            stop=["<|eot_id|>", "<|eom_id|>"],
            stream=False
        )

        model_response_content = response.choices[0].message.content.strip()
        print("Raw Model Response:", model_response_content)
        quiz = parse_quiz(model_response_content)
        quiz_answers_key = f"{data.skill}_{data.difficulty}"
        quiz_answers[quiz_answers_key] = quiz["answers"]  # Store answers globally
        return QuizResponse(questions=quiz["questions"], answers=quiz["answers"])

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating quiz: {str(e)}")

def parse_quiz(content: str) -> Dict[str, List[Dict[str, List[str]]]]:
    quiz = {"questions": [], "answers": []}
    content_parts = content.split("Answers:")
    
    # Extract and clean questions part
    questions_part = content_parts[0].strip()
    answers_part = content_parts[1].strip() if len(content_parts) > 1 else ""

    # Regex to find questions and options
    questions = re.findall(r'(\d+\..*?\n(?:[A-D]\).*\n?)+)', questions_part)

    for question in questions:
        lines = question.strip().split('\n')
        
        if len(lines) < 5:  # Ensure at least 1 question and 4 options
            continue

        current_question = lines[0].strip()  # The first line is the question
        current_options = [option.strip() for option in lines[1:5]]  # Assuming options are the next 4 lines

        if current_question and len(current_options) == 4:  # Ensure 4 options are present
            quiz["questions"].append({
                "question": current_question,
                "options": current_options
            })

    # Parse answers
    if answers_part:
        quiz["answers"] = [answer.strip() for answer in answers_part.split('\n') if answer.strip()]

    return quiz
    

@app.post("/submit_quiz_score/")
async def submit_quiz_score(data: SubmitQuizRequest):
    quiz_key = f"{data.skill}_{data.level}"
    correct_answers = quiz_answers.get(quiz_key)

    if not correct_answers:
        raise HTTPException(status_code=404, detail="Quiz not found or has not been generated yet.")

    score = 0
    total_questions = len(correct_answers)

    for question, correct_answer in zip(correct_answers, correct_answers):
        user_answer = data.submitted_answers.get(question)
        if user_answer == correct_answer:
            score += 1

    return {"employee_name": data.employee_name, "score": score, "total_questions": total_questions}

# Run the application if executed directly
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8002)

import os
import io
import PyPDF2
import pandas as pd
from fastapi import FastAPI, HTTPException, UploadFile, File, Response, Form
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import uvicorn
from fpdf import FPDF
from together import Together
from sklearn.feature_extraction.text import TfidfVectorizer

# Initialize the FastAPI app
app = FastAPI()

# Add CORS to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for history and curriculum mapping
history_db = []
curriculum_mapping_db = []

class HistoryItem(BaseModel):
    id: int
    curriculumName: str
    questionType: str
    numQuestions: int
    difficulty: str
    generatedQuestions: List[str]

class CurriculumMappingItem(BaseModel):
    curriculum_name: str
    subtopics: List[Dict[str, Any]]  # [{ "keyword": "variable", "mapped_questions": ["Question1", "Question2"], "count": 2 }, ...]

# API key for Together
client = Together(api_key='1121e34f5ab31666f0c57095d74d11043c960e9fdcda8f92bb6f7b88395e8776')

# Function to call the Together API for question generation from text
def generate_questions(text, number_of_questions, question_type, difficulty):
    if question_type == "programming":
        prompt = f"Generate {number_of_questions} programming questions of {difficulty} difficulty from the following text. " \
                 "Include input/output format, constraints, and explanations for each question."
    elif question_type == "truefalse":
        prompt = f"Generate {number_of_questions} True/False questions of {difficulty} difficulty from the following text. " \
                 "Include explanations for why the answer is correct or incorrect."
    else:  # Assuming question_type is "mcq"
        prompt = f"Generate {number_of_questions} MCQ questions of {difficulty} difficulty from the following text. " \
                 "Include detailed explanations for each question, and explain why the correct answer is correct."

    response = client.chat.completions.create(
        model="meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
        messages=[
            {
                "role": "system",
                "content": prompt
            },
            {"role": "user", "content": text}
        ],
        max_tokens=2048,
        temperature=0.7,
        top_p=0.7,
        top_k=50,
        repetition_penalty=1,
        stop=["<|eot_id|>", "<|eom_id|>"],
        stream=False
    )
    return response.choices[0].message.content

# Function to read and extract text content from a PDF file
def read_pdf_content(uploaded_file: UploadFile):
    pdf_reader = PyPDF2.PdfReader(uploaded_file.file)
    text = ""
    for page in range(len(pdf_reader.pages)):
        text += pdf_reader.pages[page].extract_text() or ""
    return text

# Function to read and extract content from CSV or Excel files
def read_spreadsheet_content(uploaded_file: UploadFile, file_extension: str):
    if file_extension == "csv":
        df = pd.read_csv(uploaded_file.file)
    else:
        df = pd.read_excel(uploaded_file.file)
    return df.to_string()

# Function to save questions to Excel
def save_to_excel(questions: str):
    df = pd.DataFrame({'Questions': questions.splitlines()})
    excel_path = "questions.xlsx"
    df.to_excel(excel_path, index=False)
    return excel_path

# Function to save questions to a PDF
def save_to_pdf(questions: str):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    for line in questions.splitlines():
        if len(line) > 90:
            wrapped_lines = [line[i:i + 90] for i in range(0, len(line), 90)]
            for wrapped_line in wrapped_lines:
                pdf.cell(0, 10, wrapped_line, ln=True)
        else:
            pdf.cell(0, 10, line, ln=True)

    pdf_path = "questions.pdf"
    pdf.output(pdf_path)
    return pdf_path

# Function to map questions to keywords, ensuring count does not exceed the question count
# Function to map questions to the most relevant keywords
def map_questions_to_keywords(questions: List[str], keywords: List[str], number_of_questions: int):
    subtopics_mapping = {keyword: {"mapped_questions": [], "count": 0} for keyword in keywords}
    mapped_question_count = 0
    questions_per_keyword = max(1, number_of_questions // len(keywords))  # Divide questions evenly across keywords

    # Loop through questions and map them to keywords
    for question in questions:
        if mapped_question_count >= number_of_questions:
            break  # Stop if we've already mapped the requested number of questions

        for keyword in keywords:
            if keyword in question.lower() and subtopics_mapping[keyword]["count"] < questions_per_keyword:
                subtopics_mapping[keyword]["mapped_questions"].append(question)
                subtopics_mapping[keyword]["count"] += 1
                mapped_question_count += 1
                break  # Move to the next question once it's mapped to a keyword

    # Ensure the total mapped questions don't exceed the number_of_questions
    return subtopics_mapping

# FastAPI endpoint to handle file uploads and question generation
@app.post("/uploadfile/")
async def upload_file(
    file: UploadFile = File(...),
    number_of_questions: int = Form(...),
    question_type: str = Form(...),
    difficulty: str = Form(...),
):
    file_extension = file.filename.split('.')[-1].lower()

    # Read the file content
    if file_extension == "pdf":
        content = read_pdf_content(file)
    elif file_extension in ["csv", "xlsx"]:
        content = read_spreadsheet_content(file, file_extension)
    else:
        return JSONResponse(content={"error": "Unsupported file format"}, status_code=400)

    # Generate questions based on the content
    questions = generate_questions(content, number_of_questions, question_type, difficulty).splitlines()

    # Tokenize and analyze the content for subtopics
    vectorizer = TfidfVectorizer(stop_words='english', max_features=20)  # Extract only the top 20 keywords
    tfidf_matrix = vectorizer.fit_transform([content])
    keywords = vectorizer.get_feature_names_out()

    # Map questions to keywords with the constraint on question count
    subtopics_mapping = map_questions_to_keywords(questions, keywords, number_of_questions)

    # Prepare the response with subtopics
    response_subtopics = [
        {
            "keyword": keyword,
            "mapped_questions": details["mapped_questions"],
            "count": details["count"]
        }
        for keyword, details in subtopics_mapping.items() if details["count"] > 0
    ]

    # List subtopics not involved in question generation
    unused_subtopics = [
        {
            "keyword": keyword,
            "count": 0
        }
        for keyword, details in subtopics_mapping.items() if details["count"] == 0
    ]

    # Save history and curriculum mapping
    history_item = HistoryItem(
        id=len(history_db) + 1,
        curriculumName=file.filename,
        questionType=question_type,
        numQuestions=number_of_questions,
        difficulty=difficulty,
        generatedQuestions=questions
    )
    history_db.append(history_item)

    curriculum_mapping_item = CurriculumMappingItem(
        curriculum_name=file.filename,
        subtopics=response_subtopics
    )
    curriculum_mapping_db.append(curriculum_mapping_item)

    # Save the generated questions to files
    excel_file = save_to_excel('\n'.join(questions))
    pdf_file = save_to_pdf('\n'.join(questions))

    return JSONResponse(content={
        "generated_questions": questions,
        "file_name": file.filename,
        "excel_file": excel_file,
        "pdf_file": pdf_file,
        "mapped_subtopics": response_subtopics,
        "unused_subtopics": unused_subtopics
    })
# FastAPI endpoint to retrieve curriculum mapping details
@app.get("/curriculummapping/")
async def get_curriculum_mapping():
    return curriculum_mapping_db

# FastAPI endpoint to retrieve history
@app.get("/history")
async def get_history():
    return history_db

# FastAPI endpoint to delete a history item
@app.delete("/history/{item_id}")
async def delete_history(item_id: int):
    global history_db
    history_db = [item for item in history_db if item.id != item_id]
    return {"message": "History item deleted successfully"}

# FastAPI endpoint to download the generated files
@app.get("/download/{file_type}")
async def download_file(file_type: str):
    if file_type == "excel":
        file_path = "questions.xlsx"
    elif file_type == "pdf":
        file_path = "questions.pdf"
    else:
        return JSONResponse(content={"error": "Unsupported file type"}, status_code=400)

    return StreamingResponse(io.open(file_path, mode="rb"), media_type="application/octet-stream", headers={"Content-Disposition": f"attachment; filename={file_path}"})

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
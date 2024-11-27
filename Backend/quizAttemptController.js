// backend/controllers/quizController.js
import Quiz from '../models/quizAttempt.js';

// Generate quiz and save to MongoDB
export const generateQuiz = async (req, res) => {
    const { employeeName, skill, level, questions } = req.body;
    
    const newQuiz = new Quiz({
        employeeName,
        skill,
        level,
        questions,
        submittedAnswers: [],
    });

    try {
        const savedQuiz = await newQuiz.save();
        res.status(201).json(savedQuiz);
    } catch (error) {
        res.status(500).json({ message: "Error saving quiz to database", error: error.message });
    }
};

// Submit quiz answers and evaluate score
export const submitQuiz = async (req, res) => {
    const { employeeName, skill, level, submittedAnswers } = req.body;

    try {
        const quiz = await Quiz.findOne({ employeeName, skill, level }).sort({ createdAt: -1 });
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found." });
        }

        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === submittedAnswers[`Question ${index + 1}`]) {
                score++;
            }
        });

        quiz.submittedAnswers = submittedAnswers;
        quiz.score = score;
        await quiz.save();

        res.status(200).json({ message: "Quiz submitted successfully!", score });
    } catch (error) {
        res.status(500).json({ message: "Error submitting quiz", error: error.message });
    }
};

// backend/models/Quiz.js
import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    employeeName: { type: String, required: true },
    skill: { type: String, required: true },
    level: { type: String, required: true },
    questions: [{ type: Object, required: true }],
    answers: [{ type: String, required: true }],
    submittedAnswers: [{ type: String, required: true }],
    score: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;

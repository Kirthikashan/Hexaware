// backend/routes/quizRoutes.js
import express from 'express';
import { generateQuiz, submitQuiz } from '../controllers/quizAttemptController.js';

const router = express.Router();

router.post('/generate_quiz', generateQuiz);
router.post('/submit_quiz_score', submitQuiz);

export default router;

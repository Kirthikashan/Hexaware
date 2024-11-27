// routes/quizRoutes.js

import express from 'express';
import { getQuizQuestions, submitQuiz } from '../controllers/quizController.js';

const router = express.Router();

// Route to get quiz questions based on the topic
router.get('/:topic', getQuizQuestions);

// Route to submit quiz answers and calculate the score
router.post('/submit', submitQuiz);

export default router;

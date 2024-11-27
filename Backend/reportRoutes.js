import express from 'express';
import { analyzeSentiment } from '../controllers/sentimentController.js';

const router = express.Router();

// Route to get feedback sentiment analysis
router.get('/api/sentiment/analyze-sentiment', analyzeSentiment);

export default router;

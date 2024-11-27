// routes/sentimentRoutes.js
import express from 'express';
import { analyzeSentiment } from '../controllers/sentimentController.js';

const router = express.Router();

// Route for sentiment analysis
router.get('/analyze-sentiment', analyzeSentiment);

export default router;

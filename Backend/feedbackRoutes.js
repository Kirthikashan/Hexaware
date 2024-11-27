// routes/feedbackRoutes.js
import express from 'express';
import { submitFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

// Route for submitting feedback
router.post('/feedback', submitFeedback);

export default router;

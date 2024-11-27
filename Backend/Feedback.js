// models/Feedback.js
import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: true,
  },
  sentiment: {
    type: String, // To store sentiment analysis results
  },
  suggestions: {
    type: String,
     // To store suggestions from sentiment analysis
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

export default Feedback;
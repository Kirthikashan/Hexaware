// controllers/sentimentController.js
import Feedback from '../models/Feedback.js'; // Import feedback model

// Fetch all feedback entries from the database and send them to the frontend
export const analyzeSentiment = async (req, res) => {
  try {
    // Fetch feedback data from MongoDB
    const feedbacks = await Feedback.find();  // Fetch all feedbacks from the collection

    if (!feedbacks || feedbacks.length === 0) {
      return res.status(404).json({ message: 'No feedbacks found.' });
    }

    // Return the feedback data (this is what you want in the frontend)
    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error("Error in fetching feedback:", error);
    res.status(500).json({ message: "Failed to fetch feedback" });
  }
};
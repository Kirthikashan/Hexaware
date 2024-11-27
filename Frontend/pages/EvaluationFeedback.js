import React, { useState } from 'react';
import './employeeDashboard.module.css'; // Ensure the correct path for CSS import
import SidebarEmployee from '../components/SidebarEmployee'; // Ensure correct import

const EvaluationFeedback = () => {
  // State management
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form submission
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    // Display a message while the feedback is being submitted
    setMessage('Submitting your feedback...');

    try {
      const response = await fetch('http://localhost:5006/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });

      const data = await response.json();

      // Display success or failure message
      setMessage(data.message || 'Feedback submitted successfully!');
      setIsSubmitted(true); // Mark feedback as submitted
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="evaluation-feedback">
      <SidebarEmployee />
      <h1>Evaluation and Feedback</h1>

      <section className="feedback-section">
        <h2>Submit Your Feedback</h2>

        {/* Feedback Form */}
        <form onSubmit={handleFeedbackSubmit}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback here..."
            rows="4"
            required
          />
          <button type="submit" className="feedback-submit-button">
            Submit
          </button>
        </form>

        {/* Display submission message */}
        {message && <p className="feedback-message">{message}</p>}

        {/* Close feedback button will only appear after the feedback is submitted */}
        {isSubmitted && (
          <button
            onClick={() => setIsSubmitted(false)} // Only close the feedback form when the user clicks this button
            className="close-feedback-button"
          >
            Close Feedback Box
          </button>
        )}
      </section>
    </div>
  );
};

export default EvaluationFeedback;
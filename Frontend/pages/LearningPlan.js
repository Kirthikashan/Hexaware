import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarEmployee from '../components/SidebarEmployee'; // Ensure this component exists
import styles from './LearningPlan.module.css'; // Import styles as a module

const LearningPlan = () => {
  // State to hold feedback, message, and dialog visibility
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  const [isFeedbackDialogOpen, setFeedbackDialogOpen] = useState(false); // State to manage dialog visibility
  const [isSubmitted, setIsSubmitted] = useState(false); // Track feedback submission

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5006/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });

      const data = await response.json();
      setMessage(data.message || 'Feedback submitted successfully!');
      setIsSubmitted(true); // Mark feedback as submitted
      setFeedback(''); // Clear feedback input
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('Failed to submit feedback. Please try again.');
    }
  };

  const toggleFeedbackDialog = () => {
    setFeedbackDialogOpen(!isFeedbackDialogOpen); // Toggle dialog visibility
    setIsSubmitted(false); // Reset submission state when reopening the dialog
    setMessage(''); // Clear message when reopening
  };

  return (
    <div className={styles.learningPlan}>
      <SidebarEmployee /> {/* Include the SidebarEmployee component */}
      <h1>Learning Plan</h1>
      <p>
        The Learning Plan application empowers employees by providing a structured approach to professional development. 
        It features self-assessments, tailored learning goals, and curated pathways to help users identify strengths 
        and areas for improvement. With options for feedback and quizzes, the platform fosters a collaborative learning 
        environment, enabling individuals to enhance their skills and advance their careers effectively.
      </p>
      {/* Navigation Options */}
      <div className={styles.tabs}>
        <Link to="/self-assessment">
          <button>Self Assessment</button>
        </Link>
        <Link to="/learning-goals"> {/* New link to the Learning Resources page */}
          <button>Learning Goals</button>
        </Link>
        <button onClick={toggleFeedbackDialog}>Evaluation and Feedback</button>
        <Link to="/take-quiz">
          <button>Take Quiz</button>
        </Link> {/* New Take Quiz option */}
      </div>

      {/* Feedback Submission Dialog */}
      {isFeedbackDialogOpen && (
        <div className={styles.feedbackDialog}>
          <h2>Submit Your Feedback</h2>
          <form onSubmit={handleFeedbackSubmit}>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback here..."
              rows="4"
              required
            />
            <button type="submit" className={styles.feedbackSubmitButton}>
              Submit
            </button>
            <button
              type="button"
              className={styles.closeDialogButton}
              onClick={toggleFeedbackDialog}
            >
              Close
            </button>
          </form>
          
          {/* Display submission message */}
          {message && <p className={styles.feedbackMessage}>{message}</p>}

          {/* Display 'Close Feedback Box' button after feedback is submitted */}
          
        </div>
      )}
    </div>
  );
};

export default LearningPlan;
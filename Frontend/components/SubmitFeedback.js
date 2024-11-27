import React, { useState } from 'react';

const SubmitFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const submitFeedback = () => {
    console.log(`Feedback submitted: ${feedback}`);
    setSuccessMessage('Feedback submitted successfully!'); // Show success message
    setFeedback(''); // Clear the textarea
  };

  return (
    <section id="submit-feedback">
      <h2>Submit Feedback</h2>
      <textarea
        value={feedback}
        onChange={handleFeedbackChange}
        placeholder="Enter your feedback here..."
      />
      <button onClick={submitFeedback}>Submit</button>
      {successMessage && <p>{successMessage}</p>} {/* Display message here */}
    </section>
  );
};

export default SubmitFeedback;

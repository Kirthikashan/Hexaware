// controllers/quizController.js

import questions from '../models/questions.js';  // Ensure the import path is correct

// Function to get quiz questions based on the topic
export const getQuizQuestions = (req, res) => {
  const topic = req.params.topic;

  if (questions[topic]) {
    res.json(questions[topic]);  // Send the questions for the selected topic
  } else {
    res.status(404).json({ message: 'Topic not found' });  // Handle topic not found
  }
};

// Function to submit the quiz answers and calculate the score
export const submitQuiz = (req, res) => {
  const { answers } = req.body;  // Extract answers from request body
  let score = 0;

  // Loop through each question to check the answers
  for (const [questionId, userAnswer] of Object.entries(answers)) {
    const question = Object.values(questions.JavaScript).find(q => q.id === parseInt(questionId));  // Find the question by ID
    if (question && userAnswer.selected === question.answer) {
      score++;  // Increment score for each correct answer
    }
  }

  res.json({ score });  // Send the score back to the client
};

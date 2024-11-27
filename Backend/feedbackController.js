// controllers/feedbackController.js
import Feedback from '../models/Feedback.js';
import nodemailer from 'nodemailer';
import Together from 'together-ai'; // Import Together AI for sentiment analysis

const together = new Together({ apiKey: '1121e34f5ab31666f0c57095d74d11043c960e9fdcda8f92bb6f7b88395e8776' });

// Submit feedback, analyze sentiment, and send an email notification
export const submitFeedback = async (req, res) => {
  console.log('Received feedback:', req.body); // Debugging line
  const { feedback } = req.body;

  if (!feedback) {
    return res.status(400).json({ message: 'Feedback is required' });
  }

  try {
    // Save the feedback to the database
    const newFeedback = new Feedback({ feedback });
    await newFeedback.save();

    // Analyze sentiment using Together AI
    const analysisResponse = await together.chat.completions.create({
      messages: [{
        role: 'system',
        content: `Please analyze the following feedback and provide a detailed response in the format: 
                  Sentiment: [Provide a brief and polite sentiment analysis with some context about the feedback]
                  Suggestions: [Offer constructive and polite suggestions for improvement]
    
                  Feedback: ${feedback}`
      }],
      model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
      max_tokens: 512,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
      stop: ["<|eot_id|>", "<|eom_id|>"],
    });
    

    const sentimentResult = analysisResponse.choices[0].message.content;

    // Split the result into sentiment and suggestion based on structured format
    const [sentimentPart, suggestionPart] = sentimentResult.split("Suggestions: ");

    // Extract sentiment and suggestions separately
    const sentiment = sentimentPart.replace("Sentiment: ", "").trim();
    const suggestion = suggestionPart ? suggestionPart.trim() : 'No suggestions available';

    // Update newFeedback object with sentiment and suggestions in separate columns
    newFeedback.sentiment = sentiment;
    newFeedback.suggestions = suggestion;
    await newFeedback.save(); // Save the updated feedback document

    // Send email notification using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or any other email service
      auth: {
        user: process.env.EMAIL_USER, // your email from environment variable
        pass: process.env.EMAIL_PASS, // your email password from environment variable
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'askify2024@gmail.com', // Replace with the recipient's email address
      subject: 'New Feedback Submitted',
      text: `New feedback has been received:\n${feedback}\n\nSentiment: ${newFeedback.sentiment}\nSuggestions: ${newFeedback.suggestions}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    // Send a response back to the client
    res.status(200).json({
      message: 'Feedback submitted successfully!',
      sentiment: newFeedback.sentiment,
      suggestions: newFeedback.suggestions,
    });
  } catch (error) {
    console.error('Error processing feedback or analyzing sentiment:', error);
    res.status(500).json({ message: 'Failed to submit feedback' });
  }
};

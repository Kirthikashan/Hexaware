// controllers/contactController.js

import Contact from '../models/contactModel.js'; // Create this model in the next step

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new contact document
    const newContact = new Contact({
      name,
      email,
      message,
    });

    // Save contact form data to the database
    await newContact.save();

    return res.status(200).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while submitting the form' });
  }
};
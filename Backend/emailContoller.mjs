// emailController.mjs
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a transporter object using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use 'gmail' since you're using Gmail
  auth: {
    user: process.env.EMAIL_USER, // From .env file
    pass: process.env.EMAIL_PASS, // From .env file
  },
});

// Function to send reminder email
export const sendReminderEmail = async (req, res) => {
  const { email, deadline } = req.body; // email is the recipient (user's email)

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email from .env
    to: email, // Recipient email (user's email)
    subject: 'Reminder: Assessment Deadline Approaching',
    text: `Dear User,\n\nThis is a reminder that your assessment deadline is approaching on ${deadline}.\nPlease complete your assessment before the deadline.\n\nBest Regards,\nYour Team`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Reminder email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email.' });
  }
};

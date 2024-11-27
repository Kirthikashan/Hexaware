import dotenv from 'dotenv';
dotenv.config();
import User from '../models/User.js'; // Adjust the path as necessary
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Register a new user
export const registerUser = async (req, res) => {
  const { email, password, confirmPassword, role } = req.body;

  try {
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if the email is already registered with the same role
    const existingUser = await User.findOne({ email, role });
    if (existingUser) {
      return res.status(400).json({ message: 'This email is already registered for the selected role' });
    }

    // Admin-specific registration check
    if (role === 'administrator') {
      // Check if the email is listed in the database with the 'administrator' role
      const existingAdmin = await User.findOne({ email, role: 'administrator' });
      if (!existingAdmin) {
        return res.status(401).json({
          message: `Unauthorized: The provided email is not authorized to register as an administrator.<br />Please contact <a href="mailto:askify2024@gmail.com">askify2024@gmail.com</a> for authorization.`,
        });
      }
      
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      joinedDate: new Date(), // Set the joined date to the current date
    });
    await newUser.save();
    // Create a new user and save to the database
    // Send welcome email after successful registration
    sendWelcomeEmail(email);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error); // Log the error
    res.status(500).json({ message: 'This email is already registered for the another role', error });
  }
};

// Log in a user
export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    
    // Check if the user exists and if the role matches
    if (!user || user.role !== role) {
      return res.status(404).json({ message: 'User not found or incorrect role selected' });
    }
    // Update lastLogin field
    user.lastLogin = Date.now();
    await user.save(); // Save the updated user with the new lastLogin

    // Admin-specific login check
    if (role === 'administrator') {
      // Verify that the admin's email is registered as an administrator in the database
      const existingAdmin = await User.findOne({ email, role: 'administrator' });
      if (!existingAdmin) {
        return res.status(401).json({
          message: 'Unauthorized: The provided email is not registered as an administrator.',
        });
      }
    }

    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Token creation
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send login alert email after successful login
    sendLoginEmail(email);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error); // Log the error
    res.status(500).json({ message: 'Login failed', error });
  }
};

// Function to send a welcome email
const sendWelcomeEmail = (email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Our Platform!',
    text: `Hello,

Thank you for registering on our platform. We're glad to have you onboard!

Best regards,
The Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending welcome email:', error);
    } else {
      console.log('Welcome email sent:', info.response);
    }
  });
};

// Function to send a login alert email
const sendLoginEmail = (email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Login Alert',
    text: `Hello,

You have successfully logged into our platform. If this wasn't you, please reset your password immediately.

Best regards,
The Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending login email:', error);
    } else {
      console.log('Login email sent:', info.response);
    }
  });
};
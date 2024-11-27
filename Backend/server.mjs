import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.mjs';
import profileRoutes from './routes/profileRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { authenticate } from './middleware/authMiddleware.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import reportRoutes from './routes/reportRoutes.js';
import dotenv from 'dotenv';
import feedbackRoutes from './routes/feedbackRoutes.js';
import sentimentRoutes from './routes/sentimentRoutes.js';  
import { createProxyMiddleware } from 'http-proxy-middleware';
import fileUpload from 'express-fileupload';
import uploadRoutes from './routes/uploadRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import questions from './models/questions.js'; 
import adminRoutes from './routes/adminRoutes.js';
import Curriculum from './models/CurriculumModel.js'; // Ensure the path is correct and includes the .js extension
import QuestionBank from './models/QuestionBank.js'; // Same for QuestionBank
import multer from 'multer';
import curriculumRoutes from './routes/curriculumRoutes.js'; 
import xlsx from 'xlsx';
import quizAttemptRoutes from './routes/quizAttemptRoutes.js';


// Initialize dotenv to load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/HEXAWARE', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define the Question Schema
const questionSchema = new mongoose.Schema({
  topic: String,
  difficulty: String,
  question: String,
  options: [String],
  answer: String
});

// Create the Question Model
const Question = mongoose.model('Question', questionSchema);

app.get('/api/questions', (req, res) => {
  const { topic, difficulty } = req.query;

  // Fetch questions from the questions object
  const topicQuestions = questions[topic]?.[difficulty];

  if (!topicQuestions) {
    return res.status(404).json({ error: 'No questions found for this topic and difficulty.' });
  }

  res.json(topicQuestions);
});

// Proxy configuration for FastAPI
app.use('/upload', createProxyMiddleware({
  target: 'http://localhost:8000', // FastAPI server address
  changeOrigin: true,
}));

app.use('/generate_questions', createProxyMiddleware({
  target: 'http://localhost:8000', // FastAPI server address
  changeOrigin: true,
}));

app.use('/download', createProxyMiddleware({
  target: 'http://localhost:8000', // FastAPI server address
  changeOrigin: true,
}));

// Proxy configuration for self-assessment
app.use('/self-assessment', createProxyMiddleware({
  target: 'http://localhost:8002', // FastAPI server address
  changeOrigin: true,
}));

// Use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', authenticate, profileRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api', feedbackRoutes);
app.use('/api/sentiment', sentimentRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/admin/report',reportRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin/curriculum', curriculumRoutes);
app.use('/', quizAttemptRoutes);

// Middleware for file uploads
const upload = multer({ dest: 'uploads/' }); // Directory for storing uploaded files

// Endpoint to upload curriculum
app.post('/api/admin/upload-curriculum', upload.single('file'), async (req, res) => {
  const file = req.file;

  // Parse the uploaded Excel or CSV file
  const workbook = xlsx.readFile(file.path);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const curriculumData = xlsx.utils.sheet_to_json(worksheet);
  

  
  // Save curriculum data to the database
  try {
    await Curriculum.insertMany(curriculumData);
    res.json({ message: 'Curriculum uploaded successfully', curriculumData });
  } catch (error) {
    res.status(500).json({ message: 'Error saving curriculum.' });
  }
});

// Endpoint to fetch curriculum mapping
app.get('/api/admin/curriculum-mapping', async (req, res) => {
  try {
    const curriculumTopics = await Curriculum.find();
    const questionBank = await QuestionBank.find(); // Ensure questions are tagged with topics

    const mapping = curriculumTopics.map(topic => {
      const questionsForTopic = questionBank.filter(q => q.topic === topic.topic);
      return {
        topic: topic.topic,
        subtopic: topic.subtopic,
        questionsGenerated: questionsForTopic.length
      };
    });

    res.json({ mapping });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching curriculum mapping.' });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('An error occurred:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});
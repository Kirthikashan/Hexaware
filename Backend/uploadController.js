import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import UploadedFile from '../models/UploadedFile.js'; // Assuming you have a model for saving file information to the DB

// Define the directory to upload files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory where uploaded files will be stored
const uploadDirectory = path.join(__dirname, '../uploads');

// Function to handle file uploads using express-fileupload
export const handleFileUpload = (req, res) => {
  // Check if any files were uploaded
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.files.file; // Access the uploaded file
  const uploadPath = path.join(uploadDirectory, uploadedFile.name); // Set upload path

  // Create upload directory if it doesn't exist
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
  }

  // Move the uploaded file to the desired location
  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    // After moving the file, spawn the Python process
    const pythonProcess = spawn('python', ['C:/Users/kirth/Downloads/HEXAWARE_Project/HEXAWARE/backend/main.py', uploadPath]);

    // Capture output from the Python process
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      res.json({ message: 'File uploaded and Python script executed successfully!' });
    });
  });
};

// Function to handle file uploads using multer
export const uploadFiles = async (req, res) => {
  try {
    // Check if files are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    // Save uploaded file information to the database
    const uploadedFiles = req.files.map(file => ({
      filename: file.originalname,
      path: file.path,
      uploadDate: new Date(), // Add upload date
      uploadedBy: req.user._id // Add uploadedBy field (assuming authentication is handled)
    }));

    // Save all files to the database
    await UploadedFile.insertMany(uploadedFiles);

    // Send back the uploaded file info
    res.status(200).json({ files: uploadedFiles });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ message: 'Error uploading files' });
  }
};

import express from 'express';
import multer from 'multer';  // Import multer for file uploads
import fileUpload from 'express-fileupload'; // Import express-fileupload middleware
import { handleFileUpload, uploadFiles } from '../controllers/uploadController.js';
import { authenticate } from '../middleware/authMiddleware.js'; // Import authentication middleware

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads'; // Directory to save files
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Middleware for handling file uploads via express-fileupload
router.use(fileUpload());

// Define POST route for file uploads using express-fileupload
router.post('/upload-express', handleFileUpload);

// Define POST route for file uploads using multer with authentication
router.post('/upload-multer', authenticate, upload.array('files'), uploadFiles);

export default router;

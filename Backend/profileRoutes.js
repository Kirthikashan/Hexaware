import express from 'express';
import { getUserProfile, updateUserProfile, uploadProfilePicture } from '../controllers/profileController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Protected route to get user profile
router.get('/', authenticate, getUserProfile);

// Protected route to update user profile
router.put('/', authenticate, updateUserProfile);

// Protected route to upload profile picture
router.post('/picture', authenticate, upload.single('profilePicture'), uploadProfilePicture);

export default router;
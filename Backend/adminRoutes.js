// adminRoutes.js
import express from 'express';
import {
  getStats,
  searchUsers,
  getUsers,
  addUser,
  deleteUser,
  exportUsersAsCSV,
  deactivateUser
} from '../controllers/adminController.js';



const router = express.Router();

// Admin routes
router.get('/stats', getStats); // Retrieve platform statistics
router.get('/users/search', searchUsers); // Search users based on email
router.get('/users', getUsers); // Retrieve all users
router.post('/users', addUser); // Add a new user
router.delete('/users/:id', deleteUser); // Delete a user
router.get('/users/export', exportUsersAsCSV); // Export users as CSV
router.put('/users/:id/deactivate', deactivateUser); // Deactivate a user account


export default router;
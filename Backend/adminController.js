import User from '../models/User.js'; // Import the User model
import { Parser } from 'json2csv';



// Retrieve statistics about the platform
export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ role: { $in: ['employee', 'trainer'] } });

    res.status(200).json({
      totalUsers,
      activeUsers,
      serverStatus: 'Running',
      totalQuestions: 500 // Replace with actual data if available
    });
  } catch (error) {
    console.error('Error retrieving statistics:', error);
    res.status(500).json({ message: 'Error retrieving statistics', error: error.message });
  }
};

// Search users based on email
export const searchUsers = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const users = await User.find({ email: { $regex: query, $options: 'i' } });
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ message: 'Error searching users', error: error.message });
  }
};

// Retrieve all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
};

// Add a new user
export const addUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password, and role are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const newUser = new User({ email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User added successfully', newUser });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Error adding user', error: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Export users as CSV
export const exportUsersAsCSV = async (req, res) => {
  try {
    const users = await User.find().select('email role -_id');
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users to export' });
    }
    const csv = new Parser().parse(users);
    res.header('Content-Type', 'text/csv');
    res.attachment('users.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error exporting users as CSV:', error);
    res.status(500).json({ message: 'Error exporting users', error: error.message });
  }
};

// Deactivate a user account
export const deactivateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id, { active: false }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User account deactivated successfully', user });
  } catch (error) {
    console.error('Error deactivating user:', error);
    res.status(500).json({ message: 'Error deactivating user', error: error.message });
  }
};
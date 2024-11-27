import User from '../models/User.js';

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is available in req.user from middleware
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is available from authentication middleware
    const { bio, skills } = req.body;

    // Update user profile in the database with bio, skills, and lastLogin timestamp
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        bio,
        skills,
        lastLogin: Date.now(), // Update lastLogin when profile is updated
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};

// Upload User Profile Picture
export const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is available in req.user
    const { path } = req.file; // Assuming multer is being used to handle file uploads

    // Update profile picture URL
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: path },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload profile picture', error: error.message });
  }
};

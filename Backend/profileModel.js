import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  skills: { type: [String], default: [] },
  joinedDate: { type: Date, default: Date.now }, // Automatically set to current date
  lastLogin: { type: Date, default: Date.now },
  profilePicture: { type: String, default: '' }, // URL or file path
  role: { type: String, default: 'User' },
});

export default mongoose.model('User', userSchema);
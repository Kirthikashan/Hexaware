import mongoose from 'mongoose';

// Define the schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['administrator', 'employee', 'trainer'],
    default: 'employee',
  },
  joinedDate: {
    type: Date,
    default: Date.now,  // Automatically set the registration date
  },
  lastLogin: {
    type: Date,  // Will be updated when the user logs in
  },
}, { timestamps: true });

userSchema.index({ email: 1, role: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
export default User;
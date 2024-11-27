const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  action: { type: String, required: true }, // Action taken, e.g., 'User deleted', 'Role updated'
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Admin who performed the action
  targetUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User affected by the action
  timestamp: { type: Date, default: Date.now },
  details: { type: String }, // Additional details
});

module.exports = mongoose.model('AdminAction', adminSchema);
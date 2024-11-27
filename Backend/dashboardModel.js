const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activity: { type: String, required: true }, // Could represent different activities (e.g., login, learning, etc.)
  timestamp: { type: Date, default: Date.now },
  metrics: { type: Object }, // Additional performance metrics
});

module.exports = mongoose.model('Dashboard', dashboardSchema);
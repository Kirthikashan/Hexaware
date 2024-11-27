const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Define route for dashboard data retrieval
router.get('/data', dashboardController.getDashboardData);

module.exports = router;

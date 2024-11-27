const express = require('express');
const router = express.Router();
const learningDevController = require('../controllers/learningDevController');

router.get('/courses', learningDevController.getCourses);

module.exports = router;

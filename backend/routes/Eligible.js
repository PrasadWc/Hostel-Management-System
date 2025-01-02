// /backend/routes/Eligible.js

const express = require('express');
const router = express.Router();
const eligibleController = require('../controllers/eligibleController');

// Define endpoint to get eligible students
router.get('/getEligibleStudents', eligibleController.getEligibleStudents);

module.exports = router;

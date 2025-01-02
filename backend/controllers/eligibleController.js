// /backend/controllers/eligibleController.js

const Student = require('../models/Student');

const students = [
    { fullName: 'John Doe', distance: 45 },
    // Other students...
  ];
const getEligibleStudents = async (req, res) => {
  try {
    // Fetch eligible students from the database with a distance greater than 40
    const eligibleStudents = await Student.find({ distance: { $gt: 40 } });

    // Sort the eligible students array in descending order based on distance
    const sortedStudents = eligibleStudents.sort((a, b) => b.distance - a.distance);

    // Extract and send the list of student index numbers as JSON
    const studentIndexNumbers = sortedStudents.map(student => student.uniRegNo);
    res.json(studentIndexNumbers);
  } catch (error) {
    // Handle errors appropriately
    console.error('Error fetching and sorting eligible students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getEligibleStudents,
  // Other controller functions as needed
};

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: false,
  },

  address: {
    type: String,
    required: false,
  },

  district: {
    type: String,
    required: false,
  },

  province: {
    type: String,
    required: false,
  },

  gender: {
    type: String,
    required: false,
  },

  birthday: {
    type: String,
    required: false,
  },

  nic: {
    type: String,
    required: false,
  },

  uniRegNo: {
    type: String,
    required: false,
  },

  faculty: {
    type: String,
    required: false,
  },

  yearOfStudy: {
    type: String,
    required: false,
  },

  contactNo: {
    type: String,
    required: false,
  },

  distance: {
    type: String,
    required: false,
  },

  email: {
    type: String,
    required: false,
  },

  medicalHistory: {
    type: String,
    required: false,
  },

  emergencyContactName: {
    type: String,
    required: false,
  },

  emergencyContactPhone: {
    type: String,
    required: false,
  },

  password: {
    type: String,
    required: false,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

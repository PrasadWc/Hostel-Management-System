const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hostelSchema = new Schema({
  hostelName: {
    type: String,
    required: true,
  },

  genderType: {
    type: String,
    required: true,
  },

  roomCapacity: {
    type: Number,
    required: true,
  },

  studentCapacity: {
    type: Number,
    required: true,
  },
});

const Hostel = mongoose.model("Hostel", hostelSchema);

module.exports = Hostel;

const mongoose = require("mongoose");

const Pandukabhaya2Schema = new mongoose.Schema({
  RoomNo: {
    type: String,
    required: true,
  },

  student1: {
    type: String,
    required: false,
  },

  student2: {
    type: String,
    required: false,
  },

  student3: {
    type: String,
    required: false,
  },

  student4: {
    type: String,
    required: false,
  },
});

const Pandukabhaya2 = mongoose.model("Pandukabhaya2", Pandukabhaya2Schema);

module.exports = Pandukabhaya2;

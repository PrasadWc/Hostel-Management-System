const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  uniqno: {
    type: String,
    required: false,
  },
});

const Pandukabhaya1Schema = new mongoose.Schema({
  roomNo: {
    type: String,
    required: true,
  },

  students: {
    type: [studentSchema],
    default: [],
  },
});

const Pandukabhaya1 = mongoose.model("Pandukabhaya1", Pandukabhaya1Schema);

module.exports = Pandukabhaya1;

const mongoose = require("mongoose");

const calculationSchema = new mongoose.Schema({
  expression: String,
  result: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Calculation", calculationSchema);
// models/Calculation.js
const mongoose = require("mongoose");

const calculationSchema = new mongoose.Schema(
  {
    expression: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Calculation", calculationSchema);

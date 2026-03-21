const express = require("express");
const router = express.Router();
 console.log("POST HIT"); 
const Calculation = require("../models/Calculation");

// SAVE calculation
router.post("/", async (req, res) => {
  try {
    const { expression, result } = req.body;

    const newCalc = new Calculation({
      expression,
      result
    });

    await newCalc.save();
    res.json(newCalc);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET history
router.get("/", async (req, res) => {
  const history = await Calculation.find().sort({ createdAt: -1 });
  res.json(history);
});

module.exports = router;
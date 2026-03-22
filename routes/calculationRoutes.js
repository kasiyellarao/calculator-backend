// routes/calculationRoutes.js
const express = require("express");
const router = express.Router();
const Calculation = require("../models/Calculation");

router.post("/", async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const { expression, result } = req.body;

    if (!expression || result === undefined) {
      return res.status(400).json({ message: "Expression and result are required" });
    }

    const newCalculation = new Calculation({
      expression,
      result: result.toString(),
    });

    await newCalculation.save();

    console.log("Saved successfully");

    res.status(201).json({
      message: "Calculation saved successfully",
      data: newCalculation,
    });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const calculations = await Calculation.find().sort({ createdAt: -1 });
    res.status(200).json(calculations);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

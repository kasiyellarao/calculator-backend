// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*" })); // Allow all origins
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Calculation schema
const calculationSchema = new mongoose.Schema({
  expression: String,
  result: Number,
  createdAt: { type: Date, default: Date.now }
});

const Calculation = mongoose.model("Calculation", calculationSchema);

// Routes
app.get("/api/calculations", async (req, res) => {
  try {
    const history = await Calculation.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/calculations", async (req, res) => {
  try {
    const { expression, result } = req.body;
    if (!expression || result === undefined) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const calc = await Calculation.create({ expression, result });
    res.status(201).json(calc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

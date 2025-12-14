const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ashram Backend is running 🚩");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.post("/contact", (req, res) => {
  const { name, mobile, message } = req.body;

  if (!name || !mobile || !message) {
    return res.status(400).json({
      success: false,
      message: "Kripya sabhi details bharein"
    });
  }

  console.log("📩 New Contact Received");
  console.log("Name:", name);
  console.log("Mobile:", mobile);
  console.log("Message:", message);

  res.json({
    success: true,
    message: "Aapka sandesh safalta se mil gaya 🙏"
  });
});

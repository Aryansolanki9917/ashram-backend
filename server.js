const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ================= HOME CHECK =================
app.get("/", (req, res) => {
  res.send("Ashram Backend is running 🚩");
});

// ================= DONATION LOGIC =================
const donationFile = path.join(__dirname, "donations.json");

// helper function
function readDonations() {
  if (!fs.existsSync(donationFile)) return [];
  return JSON.parse(fs.readFileSync(donationFile));
}

function saveDonations(data) {
  fs.writeFileSync(donationFile, JSON.stringify(data, null, 2));
}

// add donation
app.post("/api/donations", (req, res) => {
  const { name, amount, mobile } = req.body;

  if (!name || !amount || !mobile) {
    return res.status(400).json({
      success: false,
      message: "Sabhi fields bharein"
    });
  }

  const donations = readDonations();

  const newDonation = {
    id: Date.now(),
    name,
    amount,
    mobile,
    date: new Date().toISOString()
  };

  donations.push(newDonation);
  saveDonations(donations);

  res.json({
    success: true,
    message: "Donation safalta se receive ho gaya 🙏",
    data: newDonation
  });
});

// get donations
app.get("/api/donations", (req, res) => {
  res.json(readDonations());
});

// ================= CONTACT FORM =================
app.post("/contact", (req, res) => {
  const { name, mobile, message } = req.body;

  if (!name || !mobile || !message) {
    return res.status(400).json({
      success: false,
      message: "Kripya sabhi details bharein"
    });
  }

  console.log("📩 New Contact");
  console.log(name, mobile, message);

  res.json({
    success: true,
    message: "Aapka sandesh mil gaya 🙏"
  });
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

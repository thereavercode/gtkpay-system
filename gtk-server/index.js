// index.js
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { sendReceiptSMS } = require("./sms"); // import your sms logic
const cors = require("cors");
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

// Payment endpoint
app.post("/pay", async (req, res) => {
  const { phone, amount, name } = req.body;
  console.log("💸 Payment received:", { phone, amount, name });

  const smsResult = await sendReceiptSMS(phone, amount, name, "GNG Mediatek");

  res.status(200).json({
    message: "Payment processed and SMS sent",
    sms: smsResult,
  });
});

// Africa's Talking inbound SMS callback
app.post("/sms/callback", (req, res) => {
  const { from, text, to, id, date } = req.body;
  console.log(
    `📥 Incoming SMS: From ${from} to ${to}: "${text}" @ ${date} (ID: ${id})`
  );
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

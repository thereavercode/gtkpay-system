// index.js
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { sendReceiptSMS } = require("./sms"); // import your sms logic
const equityRoutes = require("./routes/equityRoutes");
const cors = require("cors");
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

// Mount Equity Bank API routes (validation + webhook)
app.use("/api/equity", equityRoutes);
// Payment endpoint
app.post("/pay", async (req, res) => {
  const { phone, amount, name } = req.body;
  console.log("💸 Payment received:", { phone, amount, name });

  try {
    const smsResult = await sendReceiptSMS(phone, amount, name, "GNG Mediatek");

    res.status(200).json({
      message: "Payment processed and SMS sent",
      sms: smsResult,
    });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).json({ message: "Failed to send SMS" });
  }
});
// Endpoint to handle incoming SMS from Africa's Talking
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
// Africa's Talking inbound SMS callback
app.post("/sms/callback", (req, res) => {
  const { from, text, to, id, date } = req.body;

  if (!from || !text || !to || !id || !date) {
    console.warn("Received incomplete SMS callback data:", req.body);
    return res.sendStatus(400); // Bad Request
  }

  console.log(
    `📥 Incoming SMS: From ${from} to ${to}: "${text}" @ ${date} (ID: ${id})`
  );

  // TODO: Add your message processing logic here (e.g., save to DB, trigger response)

  res.sendStatus(200); // Acknowledge receipt
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

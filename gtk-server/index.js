require("dotenv").config();

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const { sendReceiptSMS } = require("./sms");
const equityRoutes = require("./routes/equityRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000;

// Allow CORS
app.use(cors());

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make io accessible in routes/controllers
app.set("io", io);

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

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
// Export the server for testing purposes
module.exports = server;

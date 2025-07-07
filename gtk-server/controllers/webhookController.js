// controllers/webhookController.js
exports.handleTransaction = (req, res) => {
  const { transactionId, amount, phone, timestamp, status } = req.body;

  if (!transactionId || !amount || !phone || !timestamp) {
    return res.status(400).json({
      status: "fail",
      message: "Missing required fields",
    });
  }

  // Log/store transaction as needed...

  // Emit real-time update to all connected dashboard clients
  const io = req.app.get("io");
  io.emit("transactionUpdate", {
    transactionId,
    amount,
    phone,
    timestamp,
    status,
  });

  res.status(200).json({
    status: "success",
    message: "Transaction logged",
  });
};
// This function handles incoming webhook requests from the payment provider.
// It checks for required fields in the request body, logs or processes the transaction.

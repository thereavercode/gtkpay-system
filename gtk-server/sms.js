// sms.js
require("dotenv").config();

const africastalking = require("africastalking")({
  apiKey: process.env.AFRICASTALKING_APIKEY,
  username: process.env.AFRICASTALKING_USERNAME || "sandbox",
});

const sms = africastalking.SMS;

const formatPhone = (phone) => {
  if (phone.startsWith("+")) return phone;
  if (phone.startsWith("0")) return `+254${phone.slice(1)}`;
  if (phone.startsWith("254")) return `+${phone}`;
  return phone;
};

const sendReceiptSMS = async (phone, amount, name, company) => {
  const message = `Hello ${name}, we've received your payment of KES ${amount}. Thank you for choosing ${company}.`;

  try {
    const result = await sms.send({
      to: [formatPhone(phone)],
      from: "GTKPAY",
      message: message,
    });

    console.log("✅ SMS sent:", result);
    return result;
  } catch (err) {
    console.error("❌ SMS sending failed:", err.response?.data || err.message);
    return null;
  }
};

module.exports = { sendReceiptSMS };

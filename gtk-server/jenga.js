const axios = require("axios");

const sendPaymentRequest = async (paymentData) => {
  const { accessToken } = await getAccessToken(); // write this next
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const payload = {
    // Example payload structure
    merchantTransactionID,
    amount,
    currencyCode,
    value,
    source,
    destination,
  };

  const response = await axios.post(
    "https://api.jengahq.io/transaction/v2/remittance",
    payload,
    { headers }
  );
  return response.data;
};

const getAccessToken = async () => {
  const credentials = `${process.env.JENGA_CONSUMER_KEY}:${process.env.JENGA_CONSUMER_SECRET}`;
  const encoded = Buffer.from(credentials).toString("base64");

  const headers = {
    Authorization: `Basic ${encoded}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const response = await axios.post(
    "https://api.jengahq.io/token",
    "grant_type=client_credentials",
    { headers }
  );
  return { accessToken: response.data.access_token };
};

module.exports = { sendPaymentRequest };

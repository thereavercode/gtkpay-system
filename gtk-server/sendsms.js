const africastalking = require("africastalking")({
  apiKey:
    "atsk_cd8927bcd34fbc72ba93491ad2b6f53635db4c35f210db15472dafbe4d75737d66a07ed8", // Replace with your sandbox API key
  username: "sandbox", // Always 'sandbox' for testing
});

const sms = africastalking.SMS;

sms
  .send({
    to: ["+254721223223"], // Replace with a sandbox test number
    message: "Hello from Africa's Talking Sandbox!",
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

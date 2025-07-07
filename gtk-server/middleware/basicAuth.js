const basicAuth = require("basic-auth");

const USERNAME = process.env.VALIDATION_USER;
const PASSWORD = process.env.VALIDATION_PASS;

module.exports = (req, res, next) => {
  const user = basicAuth(req);

  if (!user || user.name !== USERNAME || user.pass !== PASSWORD) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }

  next();
};
// This middleware checks for basic authentication using the credentials
// provided in the environment variables VALIDATION_USER and VALIDATION_PASS.

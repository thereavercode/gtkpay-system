const express = require("express");
const router = express.Router();

const validationController = require("../controllers/validationController");
const webhookController = require("../controllers/webhookController");
const authMiddleware = require("../middleware/basicAuth");

// POST /api/equity/validate - protected by Basic Auth
router.post("/validate", authMiddleware, validationController.validateCustomer);

// POST /api/equity/webhook - protected by Basic Auth
router.post("/webhook", authMiddleware, webhookController.handleTransaction);

module.exports = router;
// This file defines the routes for the Equity API.
// It includes two endpoints:   validate and webhook

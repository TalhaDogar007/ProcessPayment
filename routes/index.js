const express = require("express");
const router = express.Router();
const payment = require("../controllers/payment");
const checkParams = require("../middleware/checkParams");
const paramsSchema = require("../middleware/checkParamsSchema");

router.get("/", function (req, res) {
  res.status(200).send("server is running");
});

// Payment
router.post(
  "/payment",
  checkParams(paramsSchema.paymentSchema, "body"),
  payment.processPayment
);

module.exports = router;

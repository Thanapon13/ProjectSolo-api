const shipmentController = require("../controllers/order-controller");
const express = require("express");

const router = express.Router();

router.post("/", shipmentController.createOrder);
module.exports = router;

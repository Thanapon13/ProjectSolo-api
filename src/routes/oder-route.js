const orderControoler = require("../controllers/order-controller");
const express = require("express");

const router = express.Router();

router.post("/", orderControoler.createOrder);
module.exports = router;

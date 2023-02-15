const orderControoler = require("../controllers/order-controller");
const upload = require("../middleware/upload");
const express = require("express");

const router = express.Router();

router.post("/", upload.single("slipUrl"), orderControoler.createOrder);
module.exports = router;

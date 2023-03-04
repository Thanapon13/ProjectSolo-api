const shipmentController = require("../controllers/shipment-controller");
const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", upload.single("slipUrl"), shipmentController.createShipment);
module.exports = router;

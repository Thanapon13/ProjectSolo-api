const express = require("express");

const AdminController = require("../controllers/AdminController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/adminOrder", authenticate, AdminController.adminOrder);

router.get("/adminOrderDelete", authenticate, AdminController.deleteOrderAdmin);

router.patch("/statusUpdateConfirmed", AdminController.updateStatusConfirmed);

router.patch(
  "/statusUpdateCancelOrder",
  AdminController.updateStatusCancelOrder
);

module.exports = router;

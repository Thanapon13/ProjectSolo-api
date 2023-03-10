const express = require("express");

const AdminController = require("../controllers/AdminController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/adminOrder", authenticate, AdminController.adminOrder);

module.exports = router;

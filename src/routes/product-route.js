const express = require("express");

const authController = require("../controllers/auth-controller");
const authenticate = require("../middleware/authenticate");
const productController = require("../controllers/product-controller");

const router = express.Router();

router.get("/", productController.getProducts);

module.exports = router;

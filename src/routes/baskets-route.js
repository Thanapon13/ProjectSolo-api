const basketsController = require("../controllers/baskets-controller");
const express = require("express");

const router = express.Router();

router.get("/getCart", basketsController.getCart);
router.post("/:productId", basketsController.addBasket);
router.delete("/:productId", basketsController.deleteProduct);
router.patch("/addQuantity", basketsController.addQuantity);
router.patch("/minusQuantity", basketsController.minusQuantity);
module.exports = router;

const multer = require("../middleware/upload");

const express = require("express");

const authenticate = require("../middleware/authenticate");
const userController = require("../controllers/user-controller");

const router = express.Router();

router.get("/userOrder", authenticate, userController.userOrderHistorys);

router.patch(
  "/",
  multer.single("profileImage"),
  userController.updateProfileImage
);

router.patch("/info", authenticate, userController.updateUserInfo);

module.exports = router;

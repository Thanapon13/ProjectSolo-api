const multer = require("../middleware/upload");

const express = require("express");

const userController = require("../controllers/user-controller");

const router = express.Router();

router.patch(
  "/",
  multer.single("profileImage"),
  userController.updateProfileImage
);

module.exports = router;

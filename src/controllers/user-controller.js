const fs = require("fs");
const { User } = require("../models");
const createError = require("../utils/create-error");
const { Op } = require("sequelize");
const { STATUS_ME } = require("../config/constant");
// const createError = require("../utils/create-error");
const cloudinary = require("../utils/cloudinary");

exports.updateProfileImage = async (req, res, next) => {
  console.log(req.file, "aaa");
  try {
    let value;
    if (req.file) {
      const profileImage = await cloudinary.upload(
        req.file.path,
        req.user.profileImage
          ? cloudinary.getPublicId(req.user.profileImage)
          : null
      );
      value = { profileImage };
      console.log(value);
    }

    await User.update(value, { where: { id: req.user.id } });
    res.status(200).json({ message: "success update" });
  } catch (err) {
    next(err);
  } finally {
    if (req.file.profileImage) {
      fs.unlinkSync(req.file.profileImage[0].path);
    }
  }
};

const fs = require("fs");
const { User } = require("../models");
const createError = require("../utils/create-error");
const { Op } = require("sequelize");
const { STATUS_ME } = require("../config/constant");
// const createError = require("../utils/create-error");
const cloudinary = require("../utils/cloudinary");

exports.updateProfileImage = async (req, res, next) => {
  try {
    let value;
    if (req.files.profileImage) {
      const profileImage = await cloudinary.upload(
        req.files.profileImage[0].path,
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
    if (req.files.profileImage) {
      fs.unlinkSync(req.files.profileImage[0].path);
    }
  }
};

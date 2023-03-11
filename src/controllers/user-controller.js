const fs = require("fs");
const { User } = require("../models");

const cloudinary = require("../utils/cloudinary");

exports.updateProfileImage = async (req, res, next) => {
  // console.log(req.file, "aaa");
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
      // console.log(value);
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

// updateUserInfo
exports.updateUserInfo = async (req, res, next) => {
  try {
    const value = req.body;
    console.log("-----------------------------> ", req.body);
    await User.update(value, {
      where: { id: req.user.dataValues.id }
    });
    res.status(200).json(value);
  } catch (err) {
    next(err);
  }
};

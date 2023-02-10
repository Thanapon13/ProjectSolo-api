const { User } = require("../models");
const createError = require("../utils/create-error");
const { Op } = require("sequelize");
const { STATUS_ME } = require("../config/constant");
// const createError = require("../utils/create-error");

exports.updateProfileImage = async (req, res, next) => {
  try {
    console.log(req.files);
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

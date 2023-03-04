const fs = require("fs");
const { Shipment } = require("../models");
const cloudinary = require("../utils/cloudinary");

exports.createShipment = async (req, res, next) => {
  try {
    let value;

    if (req.file) {
      const slipUrl = await cloudinary.upload(req.file.path);
      value = { slipUrl };
      // console.log(value, "value");
    }
    // const obj = Object.assign({}, req.body);
    // console.log(obj);
    console.log("body", req.body, "req.bod");
    value.shippingAddress = req.body.shippingAddress;
    value.orderId = req.body.orderId;
    console.log(value, "value");
    await Shipment.create(value, { where: { id: req.user.id } });
    res.status(200).json({ message: "success update" });
  } catch (err) {
    next(err);
  } finally {
    if (req.file.slipUrl) {
      fs.unlinkSync(req.file.slipUrl[0].path);
    }
  }
};

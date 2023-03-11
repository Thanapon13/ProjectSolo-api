const fs = require("fs");
const { Shipment, OrderStatus } = require("../models");
const cloudinary = require("../utils/cloudinary");

exports.createShipment = async (req, res, next) => {
  try {
    let value;

    if (req.file) {
      const slipUrl = await cloudinary.upload(req.file.path);
      value = { slipUrl };
    }
    // const obj = Object.assign({}, req.body);
    // console.log(obj);
    value.shippingAddress = req.body.shippingAddress;
    value.orderId = Number(req.body.orderId);
    console.log(value, "value");
    await Shipment.create(value);
    await OrderStatus.create({
      orderId: value.orderId,
      status: "WAITING"
    });
    // console.log(OrderStatus, "OrderStatus");
    res.status(200).json({ message: "success update" });
  } catch (err) {
    next(err);
  } finally {
    if (req.file.slipUrl) {
      fs.unlinkSync(req.file.slipUrl[0].path);
    }
  }
};

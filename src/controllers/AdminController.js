const { User, Products, OrderStatus, Order, Shipment } = require("../models");

const { sendLinenoti } = require("../service/linenoti-service");
exports.adminOrder = async (req, res, next) => {
  try {
    const adminOrder = await Order.findAll({
      include: [
        {
          model: Products
        },
        { model: User },
        { model: OrderStatus },
        { model: Shipment }
      ]
    });
    // console.log("adminOrder", adminOrder);

    res.status(200).json(adminOrder);
  } catch (err) {
    next(err);
  }
};

exports.updateStatusConfirmed = async (req, res, next) => {
  try {
    const updateStatusConfirmed = await OrderStatus.findOne({
      where: {
        orderId: req.body.orderId
      }
    });

    if (req.body.action === "confirmed") {
      await OrderStatus.update(
        { status: "CONFIRMED" },
        {
          where: {
            id: updateStatusConfirmed.id
          }
        }
      );
    }
    sendLinenoti(1, "ยืนยันการสั่งซื้อ รอการส่งสินค้าใน 3-7 วัน");

    res.status(200).json({ message: "CONFIRMED" });
  } catch (err) {
    next(err);
  }
};

exports.updateStatusCancelOrder = async (req, res, next) => {
  try {
    const updateStatusCancelOrder = await OrderStatus.findOne({
      where: {
        orderId: req.body.orderId
      }
    });

    if (req.body.action === "cancelorder") {
      await OrderStatus.update(
        { status: "CANCELORDER" },
        {
          where: {
            id: updateStatusCancelOrder.id
          }
        }
      );
    }
    sendLinenoti(1, "รายการสินค้าของคุณถูกยกเลิก ติดต่อแอดมินเพิ่มเติม");

    res.status(200).json({ message: "CANCELORDER" });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrderAdmin = async (req, res, next) => {
  try {
    const removeOrder = await Order.findOne({
      where: {
        id: req.body.id
      },
      include: [{ model: OrderStatus }]
    });
    console.log(removeOrder, "removeOrder");
    if (!removeOrder) {
      createError("this post was not found", 400);
    }
    // await removeOrder.destroy();
    res.status(200).json({ message: "Delete success" });
  } catch (err) {
    next(err);
  }
};

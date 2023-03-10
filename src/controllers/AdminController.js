const { User, Products, OrderStatus, Order } = require("../models");

exports.adminOrder = async (req, res, next) => {
  try {
    const adminOrder = await Order.findAll({
      include: [
        {
          model: Products
        },
        { model: User },
        { model: OrderStatus }
      ]
    });
    // console.log("adminOrder", adminOrder);

    res.status(200).json(adminOrder);
  } catch (err) {
    next(err);
  }
};

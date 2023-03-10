const { Order, Basket } = require("../models");

exports.createOrder = async (req, res, next) => {
  try {
    // console.log(req.body, "req.body");
    const basKetData = await Basket.findOne({
      where: {
        id: req.body.id
      }
    });
    // // console.log(req.body.basketId, "req.body.basketId");
    // console.log(JSON.parse(JSON.stringify(basKetData)), "basKetData");

    const pureBasKetData = JSON.parse(JSON.stringify(basKetData));
    console.log(pureBasKetData, "pureBasKetData");

    const createOrderData = {
      quantity: pureBasKetData.quantity,
      userId: pureBasKetData.userId,
      productId: pureBasKetData.productId
    };
    console.log(createOrderData, "createOrderData");

    const order = await Order.create(createOrderData);
    console.log(order, "aaaa");
    await Basket.destroy({
      where: {
        // id: req.body.basketId
        id: req.body.id
      }
    });
    res.status(200).json({ order });
  } catch (err) {
    console.log(err);
  }
};

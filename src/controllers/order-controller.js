const { Order, Basket } = require("../models");

exports.createOrder = async (req, res, next) => {
  try {
    console.log(req.body, "req.body");
    const basKetData = await Basket.findOne({
      where: {
        id: req.body.id
      }
    });
    // console.log(req.body.basketId, "req.body.basketId");
    console.log(JSON.parse(JSON.stringify(basKetData)), "basKetData");

    const pureBasKetData = JSON.parse(JSON.stringify(basKetData));

    const createOrderData = {
      quantity: pureBasKetData.quantity,
      userId: pureBasKetData.userId,
      productId: pureBasKetData.productId
    };
    console.log(createOrderData, "createOrderData");

    const order = await Order.create(createOrderData);
    res.json({ order });
    await Basket.destroy({
      where: {
        id: req.body.basketId
      }
    });

    // const basKet = JSON.parse(JSON.stringify(basKetData));
    // basKet.forEach(async el => {
    //   await Order.create({
    //     quantity: el.quantity,
    //     userId: el.userId,
    //     productId: el.productId
    //   });
    //   await Basket.destroy({
    //     where: {
    //       id: el.id
    //     }
    //   });
    // });

    // const newOrder = await Order.findOne({
    //   userId: req.user.id
    // });
    // res.json({ newOrder });
  } catch (err) {
    console.log(err);
  }
};

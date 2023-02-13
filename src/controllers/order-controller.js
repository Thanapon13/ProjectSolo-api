const { Order, Basket } = require("../models");

exports.createOrder = async (req, res, next) => {
  try {
    const basKetData = await Basket.findAll({
      where: {
        userId: req.user.id
      }
    });
    const basKet = JSON.parse(JSON.stringify(basKetData));
    basKet.forEach(async el => {
      await Order.create({
        quantity: el.quantity,
        userId: el.userId,
        productId: el.productId
      });
      await Basket.destroy({
        where: {
          id: el.id
        }
      });
    });

    const newOrder = await Order.findAll({
      userId: req.user.id
    });
    res.json({ newOrder });
  } catch (err) {
    console.log(err);
  }
};

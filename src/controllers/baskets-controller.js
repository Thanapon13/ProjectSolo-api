const { Products, Basket } = require("../models");
const createError = require("../utils/create-error");
exports.addBasket = async (req, res, next) => {
  try {
    const { productId } = req.params;

    await Basket.create({
      userId: req.user.id,
      productId: +productId,
      quantity: 1
    });
    const basKet = await Basket.findAll();
    // JSON.PARSE  ก็สามารถนำไปใช้งานในการแปลงข้อความ String ต่างๆ ให้เป็น JSON
    const newBasket = JSON.parse(JSON.stringify(basKet)).reduce((acc, curr) => {
      if (!acc[curr.productId]) {
        acc[curr.productId] = { ...curr };
      } else {
        acc[curr.productId] = { ...curr, quantity: curr.quantity + 1 };
      }
      return acc;
    }, {});
    res.json(newBasket);
  } catch (err) {
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const getBasket = await Basket.findAll({
      where: {
        userId: req.user.id
      },

      include: { model: Products }
    });
    res.status(200).json({ getBasket });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const remove = await Basket.findOne({
      where: {
        productId: req.params.productId
      }
    });
    if (!remove) {
      createError("this post was not found", 400);
    }
    // console.log(remove);
    // if (remove.userId !== req.user.id) {
    //   createError("you have no permission to delete this post", 403);
    // }
    // console.log(remove);1451: Cannot delete or update a parent row: a foreign key constraint fails (`project_solo`.`baskets`, CONSTRAINT `baskets_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE)

    await remove.destroy();
    res.status(200).json({ message: "Delete success" });
  } catch (err) {
    next(err);
  }
};

exports.addQuantity = async (req, res, next) => {
  try {
    console.log(req.body);
    const { quantity } = await Basket.findOne({
      where: {
        productId: req.body.productId
      },
      raw: true
    });

    await Basket.update(
      {
        quantity: quantity + 1
      },
      {
        where: {
          productId: req.body.productId
        }
      }
    );
    res.status(201).json({ mesaage: "success Add" });
  } catch (err) {
    console.log(err);
  }
};

exports.minusQuantity = async (req, res, next) => {
  try {
    console.log(req.body);
    const { quantity } = await Basket.findOne({
      where: {
        productId: req.body.productId
      },
      raw: true
    });
    if (quantity > 1) {
      await Basket.update(
        {
          quantity: quantity - 1
        },
        {
          where: {
            productId: req.body.productId
          }
        }
      );
    }

    res.status(201).json({ mesaage: "success Add" });
  } catch (err) {
    console.log(err);
  }
};

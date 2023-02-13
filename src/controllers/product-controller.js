const { Products } = require("../models");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Products.findAll({});
    console.log(products);
    res.status(201).json({ products });
  } catch (err) {
    next(err);
  }
};

const { validateLogin } = require("../validators/auth-validator");
const { User, Order, Product, OrderStatus } = require("../models");
const jwt = require("jsonwebtoken");
const createError = require("../utils/create-error");

exports.login = async (req, res, next) => {
  try {
    // value : email/password
    const value = validateLogin(req.body);

    // check user in database
    const user = await User.findOne({
      where: { email: value.email }
    });

    if (!user) {
      createError("invalid email or password", 400);
    }

    const isCorrect = await bcrypt.compare(value.password, user.password);

    if (!isCorrect) {
      createError("invalid email or password", 400);
    }

    // payload user
    const accessToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
exports.adminOrder = async (req, res, next) => {
  try {
    const adminOrder = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Product
        },
        { model: User },
        { model: OrderStatus }
      ]
    });
    // console.log("adminOrder");
    // console.log(req.user.id, "userId: req.user.id ");

    res.status(200).json(adminOrder);
  } catch (err) {
    next(err);
  }
};

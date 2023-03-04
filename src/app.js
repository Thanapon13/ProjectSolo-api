// const { sequelize } = require("./models");
// sequelize.sync({ alter: true });
// force

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRote = require("./routes/auth-route");
const userRoute = require("./routes/user-route");
const productRote = require("./routes/product-route");
const basketsRote = require("./routes/baskets-route");
const orderRote = require("./routes/oder-route");
const shipmentRote = require("./routes/shipment-route");
const authenticateMiddleware = require("./middleware/authenticate");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 1000,
    message: { message: "to many requests, please try again later" }
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRote);
app.use("/users", authenticateMiddleware, userRoute);
app.use("/products", productRote);
app.use("/baskets", authenticateMiddleware, basketsRote);
app.use("/order", authenticateMiddleware, orderRote);
app.use("/shipment", authenticateMiddleware, shipmentRote);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(chalk.yellowBright.italic.bold`server runnig on port: ${port}`);
});

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {},
    {
      underscored: true
    }
  );

  Order.associate = db => {
    Order.belongsTo(db.User, {
      foreignKey: {
        name: "orderId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  Order.associate = db => {
    Order.belongsTo(db.Products, {
      foreignKey: {
        name: "productId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };
  return Order;
};

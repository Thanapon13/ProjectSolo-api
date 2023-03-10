module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        onDelete: "RESTRICT"
      }
    },
    {
      underscored: true
    }
  );

  Order.associate = db => {
    Order.belongsTo(db.Products, {
      foreignKey: {
        name: "productId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
    Order.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
    Order.hasOne(db.Shipment, {
      foreignKey: {
        name: "orderId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
    Order.hasMany(
      db.OrderStatus,
      {
        foreignKey: "orderId",
        allowNull: false
      },
      {
        onDelete: "RESTRICT"
      }
    );
  };
  return Order;
};

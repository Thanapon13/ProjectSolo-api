module.exports = (sequelize, DataTypes) => {
  const OrderStatus = sequelize.define(
    "OrderStatus",
    {
      status: DataTypes.ENUM("confirmed", "cancelOrder")
    },
    { underscored: true }
  );

  OrderStatus.associate = db => {
    OrderStatus.belongsTo(
      db.Order,
      {
        foreignKey: "orderId",
        allowNull: false
      },
      {
        onDelete: "RESTRICT"
      }
    );
  };

  return OrderStatus;
};

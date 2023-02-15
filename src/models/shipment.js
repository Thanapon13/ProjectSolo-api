module.exports = (sequelize, DataTypes) => {
  const Shipment = sequelize.define(
    "Shipment",
    {
      slipUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        onDelete: "RESTRICT"
      },
      shippingAddress: {
        type: DataTypes.STRING,
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

  Shipment.associate = db => {
    Shipment.belongsTo(db.Order, {
      foreignKey: {
        name: "orderId"
      },
      onDelete: "RESTRICT"
    });
  };
  return Shipment;
};

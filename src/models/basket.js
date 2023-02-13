module.exports = (sequelize, DataTypes) => {
  const Basket = sequelize.define(
    "Basket",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      underscored: true
    }
  );

  Basket.associate = db => {
    Basket.belongsTo(db.Products, {
      foreignKey: {
        name: "productId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
    Basket.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return Basket;
};

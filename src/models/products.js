module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "Products",
    {
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      price: {
        type: DataTypes.STRING,
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

  Products.associate = db => {
    Products.belongsTo(db.Order, {
      foreignKey: {
        name: "orderId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  Products.associate = db => {
    Products.belongsTo(db.Categories, {
      foreignKey: {
        name: "categoryId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };
  return Products;
};

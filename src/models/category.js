module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    "Categories",
    {
      name: {
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

  Categories.associate = db => {
    Categories.hasMany(db.Products, {
      foreignKey: {
        name: "catergoryId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return Categories;
};

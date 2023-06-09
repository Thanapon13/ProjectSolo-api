module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      mobile: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          is: /^[0-9]{10}$/
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      profileImage: DataTypes.STRING,
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      lineToken: DataTypes.STRING
    },
    {
      underscored: true
    }
  );

  User.associate = db => {
    User.hasMany(db.Post, {
      foreignKey: {
        name: "userId ",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  User.associate = db => {
    User.hasMany(db.Comment, {
      foreignKey: {
        name: "userId ",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  User.associate = db => {
    User.hasMany(db.Order, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  User.associate = db => {
    User.hasMany(db.Basket, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return User;
};

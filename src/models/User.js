const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");

const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 3,
      max: 55,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Formato de email inválido",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// User.sync({ force: true });

module.exports = User;

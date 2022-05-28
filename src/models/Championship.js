const sequelize = require("../db");
const { Sequelize } = require("sequelize");
const { DataTypes } = require("sequelize");

const Championship = sequelize.define("championship", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.UUIDV4,
    allowNull: false,
  },
  teamsId: {
    type: DataTypes.ARRAY(Sequelize.UUIDV4),
    allowNull: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  finishData: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Championship;

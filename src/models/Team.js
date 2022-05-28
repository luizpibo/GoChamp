const sequelize = require("../db");
const { Sequelize } = require("sequelize");
const { DataTypes } = require("sequelize");
const Team = sequelize.define("team", {
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
  membersId: {
    type: DataTypes.ARRAY(DataTypes.UUIDV4),
    allowNull: true,
  },
});

module.exports = Team;

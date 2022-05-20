const sequelize = require("../db");
const {Sequelize} = require("sequelize");

const Team = sequelize.define("team", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrementIdentity: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ownerId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    membersId: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
    },
});

module.exports = Team;
const sequelize = require("../db");
const {Sequelize} = require("sequelize");

const Championship = sequelize.define("championship", {
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
    teamsId: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
    },
    startDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    finishData: {
        type: Sequelize.DATE,
        allowNull: false,
    }
});

module.exports = Championship;
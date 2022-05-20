const sequelize = require("../db");
const {Sequelize} = require("sequelize");
const User = sequelize.define("users", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrementIdentity: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Email invalido"
            },

        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = User
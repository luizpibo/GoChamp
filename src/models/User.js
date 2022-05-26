const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const User = sequelize.define("users", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrementIdentity: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Email invalido"
            },

        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// User.sync({force: true});

module.exports = User
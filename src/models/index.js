const sequelize = require("../db");
const { Sequelize } = require("sequelize");
const { DataTypes } = require("sequelize");

// User model ---------------------------------------------------------------
const Users = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: true,
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
  teamId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
});

// Teams model ---------------------------------------------------------------
const Teams = sequelize.define("teams", {
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
    type: DataTypes.UUID,
    allowNull: false,
  },
});

// Championships  model ---------------------------------------------------------------
const Championships = sequelize.define("championships", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: true,
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
  ownerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  limitPlayers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      max: 64,
    },
  },
  matchs: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  finishDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Associations ---------------------------------------------------------------
Teams.hasMany(Users, { foreignKey: "teamId" });
Users.belongsTo(Teams);
// , onDelete: `RESTRICT`
Users.hasOne(Teams, { foreignKey: "ownerId" });
Teams.belongsTo(Users);

Users.hasMany(Championships, { foreignKey: "ownerId" });
// Championships.belongsTo(Users);

// Championships.belongsToMany(Teams, { through: "ChampionshipsTeams" });
// Teams.belongsToMany(Championships, { through: "ChampionshipsTeams" });

Users.sync({ force: true });
Teams.sync({ force: true });
Championships.sync({ force: true });

module.exports = Championships;
module.exports = Teams;
module.exports = Users;

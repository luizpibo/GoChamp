const sequelize = require("../db");
const { Sequelize, DataTypes } = require("sequelize");

// User model ---------------------------------------------------------------
const Users = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 4,
      max: 15,
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
  imgProfileDir: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "defaultProfile.png",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Teams model ---------------------------------------------------------------
const Teams = sequelize.define("teams", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
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
  imgProfileDir: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "defaultProfile.png",
  },
  game: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// TeamMembers model ---------------------------------------------------------------
const TeamMembers = sequelize.define("team_members", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  teamId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  entryDate: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
  departureDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

// Championships  model ---------------------------------------------------------------
const Championships = sequelize.define("championships", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
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

const TeamChampionships = sequelize.define("team_championships", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  teamId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  championshipId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  entryDate: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
});

const Games = sequelize.define("games", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
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
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const refreshTokens = sequelize.define("refresh_tokens", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Associations ---------------------------------------------------------------
//Associacaa entra times e usuarios onde o usuario é o dono do time e o time recebe o id do usuario dono
try {
  Users.hasOne(Teams);
  Teams.belongsTo(Users, { foreignKey: { name: "ownerId" } });
} catch (e) {
  console.log("Erro ao criar associação entre tabelas de times e usuarios");
}

//Associacao entre times e usuarios onde um time tem varios usuarios
try {
  Users.hasOne(TeamMembers);
  TeamMembers.belongsTo(Users, { foreignKey: { name: "userId" } });
  Teams.hasMany(TeamMembers, { foreignKey: { name: "teamId" } });
  TeamMembers.belongsTo(Teams, { foreignKey: { name: "teamId" } });
} catch (e) {
  console.log("Erro ao criar associação entre tabelas de times e usuarios");
}

//Associacao entre campeonato e times
try {
  Championships.hasOne(TeamChampionships);
  TeamChampionships.belongsTo(Championships, {
    foreignKey: { name: "championshipId" },
  });
  Teams.hasMany(TeamChampionships, { foreignKey: { name: "teamId" } });
  TeamChampionships.belongsTo(Teams, { foreignKey: { name: "teamId" } });
} catch (e) {
  console.log("Erro ao criar associação entre tabelas de campeonatos e times");
}

//Associacao entre refreshTokens e usuarios
try {
  Users.hasOne(refreshTokens);
  refreshTokens.belongsTo(Users, { foreignKey: { name: "userId" } });
} catch (e) {
  console.log(
    "Erro ao criar associação entre tabelas de refreshTokens e usuarios"
  );
}

// Usar quando quiser resetar todas as tabelas do servidor....
// try {
//   sequelize.sync({ force: true });
// } catch (e) {
//   console.log("erro na sincronização do DB");
// }

module.exports = {
  Users,
  Teams,
  Championships,
  TeamMembers,
  TeamChampionships,
  Games,
};

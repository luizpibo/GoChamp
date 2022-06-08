const { Teams } = require("../../models");
const jwt = require("jsonwebtoken");

class CreateTeamUseCase {
  async execute({ name, game, token, file }) {
    const TeamAlreadyExists = await Teams.findOne({ where: { name: name } });
    let ownerId = "";

    console.log("Dados do time: ", name, game, token, file);

    if (TeamAlreadyExists) {
      throw new Error("Nome de time já cadastrado");
    }

    jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
      if (err) {
        return {
          error: "Token inválido",
        };
      } else {
        ownerId = decoded.id;
      }
    });

    const newTeam = await Teams.create({
      name,
      game,
      ownerId,
      imgProfileDir: file.filename || null,
    });

    if (newTeam) {
      return true;
    }

    return false;
  }
}

exports.module = CreateTeamUseCase;

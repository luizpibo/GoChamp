const { Teams } = require("../../models");
const jwt = require("jsonwebtoken");

class CreateTeamUseCase {
  async execute({ name, game, token, file }) {
    const TeamAlreadyExists = await Teams.findOne({ where: { name: name } });
    let ownerId = "";
    if (TeamAlreadyExists) {
      throw new Error("Nome de time já cadastrado");
    }

    const tokenresult = jwt.verify(
      token,
      process.env.JWT_KEY,
      function (err, decoded) {
        console.log("resultados da funcao de geracao do token", err, decoded);
        if (err) {
          return {
            error: "Token inválido",
          };
        } else {
          ownerId = decoded.id;
        }
      }
    );

    const newTeam = await Teams.create({
      name,
      game,
      ownerId,
      imgProfileDir: file.filename || null,
    });

    if (newTeam) {
      return true;
    }

    return null;
  }
}

exports.module = CreateTeamUseCase;

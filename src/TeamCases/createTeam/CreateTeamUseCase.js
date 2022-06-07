const { Teams } = require("../../models");
const jwt = require("jsonwebtoken");

class CreateUserUseCase {
  async execute({ name, game, token, file }) {
    const userAlreadyExists = await Teams.findOne({ where: { name: name } });
    let ownerId = "";

    if (userAlreadyExists) {
      throw new Error("Nome de time já cadastrado");
    }
    console.log("cadastrando novo time");
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

exports.module = CreateUserUseCase;

const { Teams } = require("../../models");
const jwt = require("jsonwebtoken");
const fs = require("fs");

class CreateTeamUseCase {
  async execute({ name, game, token, file }) {
    const TeamAlreadyExists = await Teams.findOne({ where: { name: name } });
    let ownerId = null;

    if (TeamAlreadyExists) {
      throw new Error("Nome de time já cadastrado");
    }
    jwt.verify(JSON.parse(token), process.env.JWT_KEY, function (err, decoded) {
      if (err) {
        throw new Error("Token inválido");
      } else {
        ownerId = decoded.id;
      }
    });

    const newTeam = await Teams.create({
      name,
      game,
      ownerId,
    });

    if (file) {
      const imagesPath = "./public/img/teams_img_profiles/";
      const imgOldPath = imagesPath + file.filename;
      const newImageProfilePath = imagesPath + newTeam.dataValues.id + ".jpg";

      fs.rename(imgOldPath, newImageProfilePath, async (err) => {
        if (err) {
          console.log("erro ao renomear arquivo");
        } else {
          newTeam.set({
            imgProfileDir: newTeam.dataValues.id + ".jpg",
          });
          await newTeam.save();
        }
      });
    }
    if (newTeam) {
      return newTeam;
    }

    return null;
  }
}

exports.module = CreateTeamUseCase;

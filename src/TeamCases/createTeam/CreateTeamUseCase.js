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
      return true;
    }

    return null;
  }
}

exports.module = CreateTeamUseCase;

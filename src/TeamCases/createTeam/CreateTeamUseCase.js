const { Teams, TeamMembers } = require("../../models");
const jwt = require("jsonwebtoken");
const fs = require("fs");

class CreateTeamUseCase {
  async execute({ name, game, userId, file }) {
    const TeamAlreadyExists = await Teams.findOne({
      raw: true,
      where: { name: name },
    });

    if (TeamAlreadyExists) {
      throw "Nome de time já cadastrado";
    }

    const UserTeams = await Teams.findAll({
      raw: true,
      where: { ownerId: userId },
    });

    if (UserTeams.length > 0) {
      const userAlreadyHasTeamWithThisGame = UserTeams.find((team) => {
        if (team.game == game) return true;
      });

      if (userAlreadyHasTeamWithThisGame) {
        throw "Usuario ja possui um time com esse jogo";
      }
    }

    // jwt.verify(JSON.parse(token), process.env.JWT_KEY, function (err, decoded) {
    //   if (err) {
    //     throw "Token inválido";
    //   } else {
    //     ownerId = decoded.id;
    //   }
    // });

    const newTeam = await Teams.create({
      name,
      game,
      ownerId: userId,
    });

    const team_member = await TeamMembers.create({
      teamId: newTeam.id,
      userId: userId,
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

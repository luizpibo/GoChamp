const { Teams, TeamMembers, Users } = require("../../models");
const jwt = require("jsonwebtoken");
const fs = require("fs");

class CreateTeamUseCase {
  async execute({ name, game, userId, file, isOwner }) {
    //procurando time com o nome passado
    const TeamAlreadyExists = await Teams.findOne({
      raw: true,
      where: { name: name },
    });

    if (TeamAlreadyExists) {
      throw "Nome de time já cadastrado";
    }

    if (isOwner) {
      const UserTeams = await Teams.findAll({
        raw: true,
        where: { ownerId: userId },
      });
      if (UserTeams.length > 0) {
        const userAlreadyHasTeamWithThisGame = UserTeams.find((team) => {
          if (team.game == game) return true;
        });

        if (userAlreadyHasTeamWithThisGame) {
          throw "Usuario ja possui um time para esse jogo";
        }
      }
    }

    const newTeam = await Teams.create({
      name,
      game,
      ownerId: userId,
    });

    try {
      if (newTeam && !isOwner) {
        console.log("caso o usuario nao seja dono...");
        const user = await Users.findOne({
          where: { id: userId },
        });
        user.set({
          isOwner: true,
        });
        await user.save();
      }
    } catch (e) {
      throw "erro ao tornar o usuário dono de time";
    }
    const team_member = await TeamMembers.create({
      teamId: newTeam.dataValues.id,
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

    return newTeam;
  }
}

exports.module = CreateTeamUseCase;

// jwt.verify(JSON.parse(token), process.env.JWT_KEY, function (err, decoded) {
//   if (err) {
//     throw "Token inválido";
//   } else {
//     ownerId = decoded.id;
//   }
// });

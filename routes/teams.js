var express = require("express");
var router = express.Router();
const { Teams, TeamMembers, Users } = require("../src/models");

router.get("/", async function (req, res, next) {
  try {
    let teams = await Teams.findAll();
    teams = teams.map((team) => {
      return {
        name: team.dataValues.name,
        game: team.dataValues.game,
        image: team.dataValues.imgProfileDir,
      };
    });
    res.render("showTeams", { layout: "user_dashboard", teams: teams });
  } catch (err) {
    res.render("teamNotFound", { layout: "user_dashboard" });
  }
});

router.get("/:name", async function (req, res, next) {
  const { name } = req.params;
  if (!name) {
    res.render("showTeams", { layout: "user_dashboard" });
  } else {
    //dados do time
    const team = await Teams.findOne({ where: { name: name } });

    //formatando dados...
    const formatedTeam = {
      name: team.dataValues.name,
      game: team.dataValues.game,
      image: team.dataValues.imgProfileDir,
      id: team.dataValues.id,
    };

    //Buscando membro do time
    const members = await TeamMembers.findAll({
      where: { teamId: formatedTeam.id },
      attributes: ["userId"],
      include: [
        {
          model: Users,
          required: true,
          attributes: ["nickname", "email", "imgProfileDir"],
        },
      ],
    });

    const formatedMembers = members.map((member) => {
      return {
        name: member.dataValues.user.dataValues.nickname,
        email: member.dataValues.user.dataValues.email,
        image: member.dataValues.user.dataValues.imgProfileDir,
      };
    });

    if (formatedTeam) {
      res.render("team", {
        layout: "user_dashboard",
        team: formatedTeam,
        members: formatedMembers,
      });
    } else {
      res.render("teamNotFound", { layout: "user_dashboard" });
    }
  }
});

module.exports = router;

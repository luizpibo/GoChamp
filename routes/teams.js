var express = require("express");
var router = express.Router();
const { Teams } = require("../src/models");

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
  const name = req.params.name;

  try {
    let team = await Teams.findOne({ where: { name: name } });
    formatedTeam = {
      name: team.dataValues.name,
      game: team.dataValues.game,
      image: team.dataValues.imgProfileDir,
    };

    if (team) {
      res.render("team", { layout: "user_dashboard", team: formatedTeam });
    } else {
      res.render("teamNotFound", { layout: "user_dashboard" });
    }
  } catch (err) {
    res.render("teamNotFound", { layout: "user_dashboard" });
  }
});

module.exports = router;

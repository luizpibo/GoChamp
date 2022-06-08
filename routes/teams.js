var express = require("express");
var router = express.Router();
const { Team } = require("../src/models");

router.get("/", function (req, res) {
  // pegar todos os times do banco de dado
  let teams = Team.findAll();
  teams = teams.map((team) => {
    return {
      name: team.dataValues.name,
      game: team.dataValues.game,
      imgProfileDir: team.dataValues.imgProfileDir,
    };
  });
  res.render("showTeams", { layout: "user_dashboard", teams });
});

router.get("/:name", function (req, res, next) {
  const name = req.params.name;

  res.render("team", { layout: "user_dashboard" });
});

module.exports = router;

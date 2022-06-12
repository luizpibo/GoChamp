var express = require("express");
var router = express.Router();
const { Teams } = require("../src/models");

router.get("/", async function (req, res) {
  // pegar todos os times do banco de dado
  let teams = await Teams.findAll();

  teamsFormated = teams.map((team) => {
    return {
      name: team.dataValues.name,
      game: team.dataValues.game,
      image: team.dataValues.imgProfileDir,
    };
  });

  res.render("showTeams", { layout: "user_dashboard", teams: teamsFormated });
});
router.get("/:name", async function (req, res, next) {
  const name = req.params.name;
  let team = await Teams.findOne({ where: { name: name } });
  formatedTeam = {
    name: team.dataValues.name,
    game: team.dataValues.game,
    image: team.dataValues.imgProfileDir,
  };
  res.render("teams", { layout: "user_dashboard", team: formatedTeam });
});

module.exports = router;

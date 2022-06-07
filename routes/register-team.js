var express = require("express");
var router = express.Router();
const CreateTeamController = require("../src/TeamCases/createTeam/CreateTeamController");

const createTeamController = new CreateTeamController.module();
const { Teams } = require("../src/models");

router.get("/", async function (req, res, next) {
  const dataTeams = await Teams.findAll();
  const teams = dataTeams.map((team) => {
    return {
      name: team.dataValues.name,
      game: team.dataValues.game,
    };
  });
  res.render("register-team", { layout: "user_dashboard", teams });
});

router.post("/", createTeamController.handle);

module.exports = router;

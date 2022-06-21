var express = require("express");
var router = express.Router();

const { TeamMembers, Teams } = require("../src/models");

router.post("/", function (req, res, next) {
  const { team_name, user_id } = req.body;
  console.log(req.body);
  if (team_name && user_id) {
    try {
      const Team = Teams.findOne({ where: { name: team_name } });
      if (Team) {
        const TeamMember = TeamMembers.create({
          teamId: Team.dataValues.id,
          userId: user_id,
        });
      } else {
        res.json({
          message: "Team not found",
        });
      }
    } catch (e) {
      res.json({
        error: e.message,
      });
    }
  }
});

module.exports = router;

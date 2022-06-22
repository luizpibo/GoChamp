const e = require("express");
var express = require("express");
var router = express.Router();
const CreateTeamController = require("../src/TeamCases/createTeam/CreateTeamController");
const createTeamController = new CreateTeamController.module();

const uploadImg = require("../src/middlewares/uploadTeamProfileImage");
const { Teams } = require("../src/models");

function sessionMiddleware(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/login");
  }
}

router.get("/", sessionMiddleware, function (req, res) {
  res.render("dashboard", {
    layout: "user_dashboard",
    userNickName: req.session.userNickName,
  });
});

router.get("/championships", sessionMiddleware, function (req, res) {
  res.render("championships", {
    layout: "user_dashboard",
    userNickName: req.session.userNickName,
  });
});

router.get("/championship-register", sessionMiddleware, function (req, res) {
  res.render("championship-register", {
    layout: "user_dashboard",
    userNickName: req.session.userNickName,
  });
});

router.get(
  "/team-register",
  sessionMiddleware,
  async function (req, res, next) {
    const dataTeams = await Teams.findAll();
    const teams = dataTeams.map((team) => {
      return {
        name: team.dataValues.name,
        game: team.dataValues.game,
        imgProfileDir: team.dataValues.imgProfileDir,
      };
    });
    res.render("team-register", { layout: "user_dashboard", teams });
  }
);

router.post(
  "/team-register",
  uploadImg.single("image"),
  createTeamController.handle
);

module.exports = router;

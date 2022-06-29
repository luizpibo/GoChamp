const e = require("express");
var express = require("express");
var router = express.Router();
const CreateTeamController = require("../src/TeamCases/createTeam/CreateTeamController");
const createTeamController = new CreateTeamController.module();

//Rota dashboard....

const uploadImg = require("../src/middlewares/uploadTeamProfileImage");
const {
  TeamMembers,
  Teams,
  RequestsToJoinTheTeam,
  Users,
} = require("../src/models");

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

router.post(
  "/ask-to-join-the-team",
  sessionMiddleware,
  async function (req, res, next) {
    const { team_name } = req.body;
    const { isOwner, userId } = req.session;

    if (team_name) {
      try {
        //Procura dados to time
        const TeamAlreadyExists = await Teams.findOne({
          raw: true,
          where: { name: team_name },
        });
        //Se o nome estiver correto
        if (TeamAlreadyExists) {
          //checa se o usuario ja é dono de um time com
          //o mesmo jogo que do time em questao
          if (isOwner) {
            const UserTeams = await Teams.findAll({
              raw: true,
              where: { ownerId: userId },
            });
            if (UserTeams) {
              //Procurar um time que contem o mesmo jogo que esta sendo procurado
              const userAlreadyHasTeamWithThisGame = UserTeams.find((team) => {
                if (team.game == TeamAlreadyExists.game) return true;
              });
              //se sim, cancelar operação..
              if (userAlreadyHasTeamWithThisGame) {
                throw "Usuario ja possui um time para esse jogo";
              }
            }
          }

          //Checar se esse usuario ja é membro de um time desse jogo
          //em questao
          const teamsThatThisUserIsMember = await TeamMembers.findAll({
            raw: true,
            include: {
              model: Teams,
              required: true,
              attributes: ["game"],
            },
            where: { userId: userId },
          });

          //Procurando um time com o mesmo jogo que o time da request
          if (teamsThatThisUserIsMember.length > 0) {
            const TeamsThatTheUserIsAMember = teamsThatThisUserIsMember.find(
              (team) => {
                if (team["team.game"] == TeamAlreadyExists.game) return true;
              }
            );
            if (TeamsThatTheUserIsAMember) {
              throw "Usuario ja é membro de um time para esse jogo!";
            }
          }
          //Checar se esse usuario ja tem convites pendentes para esse jogo
          const userRequestsToJoinATeam = await RequestsToJoinTheTeam.findAll({
            raw: true,
            where: {
              userId: userId,
              answered: false,
            },
            include: {
              model: Teams,
              required: true,
              attributes: ["game"],
            },
          });

          if (userRequestsToJoinATeam.length > 0) {
            const userHasPendingRequestsForThisGame =
              userRequestsToJoinATeam.find((invite) => {
                if (invite["team.game"] == TeamAlreadyExists.game) return true;
              });
            if (userHasPendingRequestsForThisGame) {
              throw "Usuario possui requisicoes pendentes para esse jogo!";
            }
          }
          //Criando nova requisição para entrar no time
          const newRequest = await RequestsToJoinTheTeam.create({
            userId: userId,
            teamId: TeamAlreadyExists.id,
          });
          res.json({
            success: true,
          });
        }
      } catch (e) {
        res.json({
          error: e,
        });
      }
    }
  }
);

router.get(
  "/team-requests",
  sessionMiddleware,
  async function (req, res, next) {
    //Todos os times do usuario
    const userId = req.session.userId;
    const userTeams = await Teams.findAll({
      raw: true,
      where: { ownerId: userId },
    });

    let teamsRequests = [];
    //Para cada time, procurar requisicoes pendentes
    userTeams.forEach(async (element) => {
      let requests = await RequestsToJoinTheTeam.findAll({
        raw: true,
        where: { teamId: element.id, answered: false },
        include: [
          {
            model: Teams,
            right: true,
          },
          {
            model: Users,
            right: true,
          },
        ],
      });

      //Formatando requisicoes
      var formatedRequest = requests.map((request) => {
        return {
          id: request.id,
          userNickname: request["user.nickname"],
          teamName: request["team.name"],
          teamGame: request["team.game"],
          teamImg: request["team.imgProfileDir"],
        };
      });
      console.log("requisicoes para o time..", formatedRequest);
      teamsRequests.push(formatedRequest);
    });

    console.log("todas as requesicoes..");
    console.log(teamsRequests);
    //falta terminar essa parte...
    
    res.render("team-request", {
      layout: "user_dashboard",
    });
  }
);

module.exports = router;

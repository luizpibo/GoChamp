var express = require("express");
var router = express.Router();
const sequelize = require("../src/db.js");
const User = require("../src/models/User.js");

const campeonatosDisponiveis = [
  {
    id: 1,
    nome: "Campeonato Brasileiro",
    jogo: "Counter Strike: Global Offensive",
    dataInicio: "11/04/2022",
    dataFim: "16/04/2022",
    quantidadeTimes: 20,
    quantidadeTimesInscritos: 10,
    formatoCampeonato: "default",
    linkCampeonato: "#",
    bg: "img/csgo.png"
  },
  {
    id: 2,
    nome: "Campeonato Centro-Oeste",
    jogo: "League of legends",
    dataInicio: "11/04/2022",
    dataFim: "16/04/2022",
    quantidadeTimes: 20,
    quantidadeTimesInscritos: 15,
    formatoCampeonato: "default",
    linkCampeonato: "#",
    bg: "img/lol.png"
  },
  {
    id: 3,
    nome: "Campeonato São Paulo",
    jogo: "Valorant",
    dataInicio: "11/04/2022",
    dataFim: "16/04/2022",
    quantidadeTimes: 20,
    quantidadeTimesInscritos: 05,
    formatoCampeonato: "default",
    linkCampeonato: "#",
    bg: "img/valorant.png"
  },
  {
    id: 4,
    nome: "Campeonato Brasileiro",
    jogo: "Street Figther",
    dataInicio: "11/04/2022",
    dataFim: "16/04/2022",
    quantidadeTimes: 20,
    quantidadeTimesInscritos: 10,
    formatoCampeonato: "default",
    linkCampeonato: "#",
    bg: "img/stf5.png"
  },
  {
    id: 5,
    nome: "Campeonato São Paulo",
    jogo: "Counter Strike: Global Offensive",
    dataInicio: "20/04/2022",
    dataFim: "30/04/2022",
    quantidadeTimes: 20,
    quantidadeTimesInscritos: 02,
    formatoCampeonato: "default",
    linkCampeonato: "#",
    bg: "img/csgo.png"
  },
  {
    id: 6,
    nome: "Campeonato Centro-Oeste",
    jogo: "Valorant",
    dataInicio: "20/04/2022",
    dataFim: "30/04/2022",
    quantidadeTimes: 20,
    quantidadeTimesInscritos: 05,
    formatoCampeonato: "default",
    linkCampeonato: "#",
    bg: "img/valorant.png"
  },
  {
    id: 7,
    nome: "Campeonato Centro-Oeste",
    jogo: "Street Figther",
    dataInicio: "20/04/2022",
    dataFim: "30/04/2022",
    quantidadeTimes: 20,
    quantidadeTimesInscritos: 05,
    formatoCampeonato: "default",
    linkCampeonato: "#",
    bg: "img/stf5.png"
  },
  {
    id: 8,
    nome: "Campeonato Rio de Janeiro",
    jogo: "Counter Strike: Global Offensive",
    dataInicio: "22/04/2022",
    dataFim: "02/05/2022",
    quantidadeTimes: 20,
    quantidadeTimesInscritos: 01,
    formatoCampeonato: "default",
    linkCampeonato: "#",
    bg: "img/csgo.png"
  },
  {
    id: 8,
    nome: "Campeonato Rio de Janeiro",
    jogo: "League of legends",
    dataInicio: "22/04/2022",
    dataFim: "02/05/2022",
    quantidadeTimes: 20,
    quantidadeTimesInscritos: 01,
    formatoCampeonato: "default",
    linkCampeonato: "#",
    bg: "img/lol.png"
  },
];

const ultimosResultados = [
  {
    id: 1,
    nome: "Campeonato Brasileiro",
    jogo: "Counter Strike: Global Offensive",
    dataInicio: "11/04/2022",
    dataFim: "16/04/2022",
    quantidadeTimes: 20,
    criadorCampeonato: "xxKilerxx",
    premiacao:"1º lugar: 1.000.000, 2º lugar: 500.000, 3º lugar: 250.000",
    ganhadores: [
      "xxKilerxx",
      "xxKilerxx",
      "xxKilerxx",
    ],
    url: "#",
  },
  {
    id: 1,
    nome: "Campeonato Brasileiro",
    jogo: "Counter Strike: Global Offensive",
    dataInicio: "11/04/2022",
    dataFim: "16/04/2022",
    quantidadeTimes: 20,
    criadorCampeonato: "xxKilerxx",
    premiacao:"1º lugar: 1.000.000, 2º lugar: 500.000, 3º lugar: 250.000",
    ganhadores: [
      "xxKilerxx",
      "xxKilerxx",
      "xxKilerxx",
    ],
    url: "#",
  },
  {
    id: 1,
    nome: "Campeonato Brasileiro",
    jogo: "Counter Strike: Global Offensive",
    dataInicio: "11/04/2022",
    dataFim: "16/04/2022",
    quantidadeTimes: 20,
    criadorCampeonato: "xxKilerxx",
    premiacao:"1º lugar: 1.000.000, 2º lugar: 500.000, 3º lugar: 250.000",
    ganhadores: [
      "xxKilerxx",
      "xxKilerxx",
      "xxKilerxx",
    ],
    url: "#",
  },
  {
    id: 1,
    nome: "Campeonato Brasileiro",
    jogo: "Counter Strike: Global Offensive",
    dataInicio: "11/04/2022",
    dataFim: "16/04/2022",
    quantidadeTimes: 20,
    criadorCampeonato: "xxKilerxx",
    premiacao:"1º lugar: 1.000.000, 2º lugar: 500.000, 3º lugar: 250.000",
    ganhadores: [
      "xxKilerxx",
      "xxKilerxx",
      "xxKilerxx",
    ],
    url: "#",
  },
  {
    id: 1,
    nome: "Campeonato Brasileiro",
    jogo: "Counter Strike: Global Offensive",
    dataInicio: "11/04/2022",
    dataFim: "16/04/2022",
    quantidadeTimes: 20,
    criadorCampeonato: "xxKilerxx",
    premiacao:"1º lugar: 1.000.000, 2º lugar: 500.000, 3º lugar: 250.000",
    ganhadores: [
      "xxKilerxx",
      "xxKilerxx",
      "xxKilerxx",
    ],
    url: "#",
  },
  {
    id: 1,
    nome: "Campeonato Brasileiro",
    jogo: "Counter Strike: Global Offensive",
    dataInicio: "11/04/2022",
    dataFim: "16/04/2022",
    quantidadeTimes: 20,
    criadorCampeonato: "xxKilerxx",
    premiacao:"1º lugar: 1.000.000, 2º lugar: 500.000, 3º lugar: 250.000",
    ganhadores: [
      "xxKilerxx",
      "xxKilerxx",
      "xxKilerxx",
    ],
    url: "#",
  },
  {
    id: 1,
    nome: "Campeonato Brasileiro",
    jogo: "Counter Strike: Global Offensive",
    dataInicio: "11/04/2022",
    dataFim: "16/04/2022",
    quantidadeTimes: 20,
    criadorCampeonato: "xxKilerxx",
    premiacao:"1º lugar: 1.000.000, 2º lugar: 500.000, 3º lugar: 250.000",
    ganhadores: [
      "xxKilerxx",
      "xxKilerxx",
      "xxKilerxx",
    ],
    url: "#",
  },
  {
    id: 1,
    nome: "Campeonato Brasileiro",
    jogo: "Counter Strike: Global Offensive",
    dataInicio: "11/04/2022",
    dataFim: "16/04/2022",
    quantidadeTimes: 20,
    criadorCampeonato: "xxKilerxx",
    premiacao:"1º lugar: 1.000.000, 2º lugar: 500.000, 3º lugar: 250.000",
    ganhadores: [
      "xxKilerxx",
      "xxKilerxx",
      "xxKilerxx",
    ],
    url: "#",
  },
  {
    id: 1,
    nome: "Campeonato Brasileiro",
    jogo: "Counter Strike: Global Offensive",
    dataInicio: "11/04/2022",
    dataFim: "16/04/2022",
    quantidadeTimes: 20,
    criadorCampeonato: "xxKilerxx",
    premiacao:"1º lugar: 1.000.000, 2º lugar: 500.000, 3º lugar: 250.000",
    ganhadores: [
      "xxKilerxx",
      "xxKilerxx",
      "xxKilerxx",
    ],
    url: "#",
  },
];

/* GET home page. */
router.get("/", async function (req, res, next) {
  const paginasCampeonato = [
    campeonatosDisponiveis.slice(0, 4),
    campeonatosDisponiveis.slice(4, 8),
  ];
  const paginasResultados = [
    ultimosResultados.slice(0, 3),
    ultimosResultados.slice(3, 6),
    ultimosResultados.slice(6, 9),
  ];  

  try {
    await sequelize.authenticate();
    console.log("Conectado com sucesso");
  } catch (error) {
      console.log(error);
  }

  res.render("home", { paginasCampeonato: paginasCampeonato, ultimosResultados: paginasResultados });
});

module.exports = router;

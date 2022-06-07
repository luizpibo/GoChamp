var express = require("express");
var router = express.Router();

const usuario = {
  id: 1,
  nome: "João",
  email: "adadada@adada.com",
  descricao: "Descrição do usuário",
  foto: "https://picsum.photos/200/300",
  jogos: ["Jogo 1", "Jogo 2", "Jogo 3"],
  amigos: [
    {
      id: 1,
      nome: "amanda",
      foto: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      nome: "lucas",
      foto: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      nome: "davi",
      foto: "https://picsum.photos/200/300",
    },
  ],
};

router.get("/", function (req, res, next) {
  res.render("profile", { layout: "user_dashboard.hbs", usuario: usuario });
});

module.exports = router;

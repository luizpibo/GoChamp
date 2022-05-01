var express = require("express");
var router = express.Router();

const usuario = {
    id: 1,
    nome: "João",
    email: "adadada@adada.com",
    descricao: "Descrição do usuário",
    foto: "https://picsum.photos/200/300",
    jogos: [
        'Jogo 1',
        'Jogo 2',
        'Jogo 3',
    ],
    campeonatos: [
        {
            id: 1,
            nome: "Campeonato Brasileiro",
            jogo: "Counter Strike: Global Offensive",
            colocacao: 'primeiro',
            formatoCampeonato: "default",
            linkCampeonato: "#",
        },
        {
            id: 1,
            nome: "Campeonato Brasileiro",
            jogo: "Counter Strike: Global Offensive",
            colocacao: 'primeiro',
            formatoCampeonato: "default",
            linkCampeonato: "#",
        },
        {
            id: 1,
            nome: "Campeonato Brasileiro",
            jogo: "Counter Strike: Global Offensive",
            colocacao: 'primeiro',
            formatoCampeonato: "default",
            linkCampeonato: "#",
        },
        {
            id: 1,
            nome: "Campeonato Brasileiro",
            jogo: "Counter Strike: Global Offensive",
            colocacao: 'primeiro',
            formatoCampeonato: "default",
            linkCampeonato: "#",
        },
        {
            id: 1,
            nome: "Campeonato Brasileiro",
            jogo: "Counter Strike: Global Offensive",
            colocacao: 'primeiro',
            formatoCampeonato: "default",
            linkCampeonato: "#",
        },
        {
            id: 1,
            nome: "Campeonato Brasileiro",
            jogo: "Counter Strike: Global Offensive",
            colocacao: 'primeiro',
            formatoCampeonato: "default",
            linkCampeonato: "#",
        },
    ]
}
router.get("/", function (req, res, next){
    res.render("profile", {usuario: usuario});
})

module.exports = router;
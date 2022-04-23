var express = require("express");
var router = express.Router();
const campeonatosDisponiveis = require("../mocks");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home", { campeonatosDisponiveis: campeonatosDisponiveis });
});

module.exports = router;

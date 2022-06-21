var express = require("express");
var router = express.Router();
const { User } = require("../src/models");

router.get("/", function (req, res, next) {
  res.render("profile", { layout: "user_dashboard.hbs" });
});

module.exports = router;

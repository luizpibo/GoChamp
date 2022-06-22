const e = require("express");
var express = require("express");
var router = express.Router();

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
  res.render("championships");
});

router.get("/championship-register", sessionMiddleware, function (req, res) {
  res.render("championship-register");
});

module.exports = router;

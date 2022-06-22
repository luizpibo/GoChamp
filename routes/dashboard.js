var express = require("express");
var router = express.Router();
const isAuthorized = require("../src/middlewares/auth.js");

router.get("/", function (req, res) {
  
  res.render("dashboard", { layout: "user_dashboard" });
});

module.exports = router;

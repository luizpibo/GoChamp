var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("dashboard", { layout: "user_dashboard" });
});

module.exports = router;

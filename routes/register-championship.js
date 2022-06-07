var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("register-championship", { layout: "user_dashboard" });
});

module.exports = router;

var express = require("express");
var router = express.Router();

const AuthenticateUserController = require("../src/userCases/authenticateUser/AuthenticateUserController");
const authenticateUserController = new AuthenticateUserController.module();

router.get("/", function (req, res, next) {
  res.render("login");
});

router.post("/", authenticateUserController.handle);

module.exports = router;

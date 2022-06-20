var express = require("express");
var router = express.Router();
const CreateUserController = require("../src/userCases/createUser/CreateUserController");

const createUserController = new CreateUserController.module();

router.get("/", function (req, res) {
  res.render("register-user");
});

router.post("/", createUserController.handle);

module.exports = router;

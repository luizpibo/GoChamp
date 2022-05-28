var express = require("express");
var router = express.Router();
const CreateUserController = require("../src/userCases/createUser/CreateUserController");

const controller = require("../src/controllers/UserRegister");

const createUserController = new CreateUserController.module();
router.get("/", controller.get);
router.post("/", createUserController.handle);

module.exports = router;

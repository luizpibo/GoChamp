var express = require("express");
var router = express.Router();
const CreateUserController = require("../src/userCases/createUser/CreateUserController");
const createUserController = new CreateUserController.module();

const uploadImg = require("../src/middlewares/uploadUserProfileImage");

router.get("/", function (req, res) {
  res.render("user-register");
});

router.post("/", uploadImg.single("image"), createUserController.handle);

module.exports = router;

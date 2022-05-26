var express = require("express");
var router = express.Router();
const controller = require("../src/controllers/UserRegister");

router.get("/", controller.get);
router.post("/", controller.post);

module.exports = router;

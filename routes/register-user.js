var express = require("express");
var router = express.Router();
const User = require("../src/models/User");
const md5 = require("md5");
router.get("/", function (req, res, next){
    res.render("register-user", {});
})
router.post("/", async function (req, res, next){
    console.log("req.body", req.body);
    // const reqUser = {
    //     id: md5("luiz@luiz.luiz.luiz"),
    //     name: "luiz",
    //     email: "luiz@luiz.luiz",
    //     password: md5("luiz@luiz.luiz"),
    // }
    // const result = await User.create(reqUser);
});
module.exports = router;
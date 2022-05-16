var express = require("express");
var router = express.Router();
const md5 = require("md5");
const User = require("../src/models/User");

router.get("/", function (req, res, next) {
  res.render("login", {});
});

router.post("/", async function (req, res, next) {
  const { email, password } = req.body;
  const md5Pass = md5(password);
    User.findOne({
      where: {
        email: email,
        password: md5Pass,
      },
    })
    .then(function(usuario){
        if(!usuario) {
            console.log("login/senha inválidos");
            res.sendStatus(401);
        }else{
            res.status(201);
            res.redirect("/dashboard");
        }
    }).catch((e)=>{
        res.statusCode(404).send("not FOund")
    })

});
module.exports = router;

var express = require("express");
var router = express.Router();
const User = require("../src/models/User");
const md5 = require("md5");

router.get("/", function (req, res, next){
    res.render("register-user", {});
})

router.post("/", async function (req, res, next){
    const {name, email, password, passwordConfirm} =  req.body;
    if(! password === passwordConfirm){
        res.status(200).send("senhas diferentes")
        return
    }

    const id = md5(email+name);
    const md5Password = md5(password);
    const reqUser = {
        id: id,
        name: name,
        email: email,
        password: md5Password,
    }

    const findPk = await User.findByPk(id);
    const findEmail = await User.findOne({where: {email: email}});

    if(findEmail === null && findPk === null){
        const result = await User.create(reqUser);
        if(result.dataValues){
            res.redirect("/login",201);
        }
    } else {
        res.redirect("/register-user", 100)
    }
});
module.exports = router;
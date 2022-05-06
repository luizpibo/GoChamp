var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next){
    res.render("login", {});
})

router.post("/", function (req, res, next){
    console.log("req",req.query);
    return res.redirect("/profile");
})
module.exports = router;
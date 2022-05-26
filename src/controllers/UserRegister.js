const User = require("../models/User");
const md5 = require("md5");
const express = require("express");

const { IRouterMatcher } = express();

exports.get = (request, response, next) => {
  response.render("register-user");
};

exports.post = async (request, response, next) => {
  const { name, email, password, passwordConfirm } = request.body;
  if (!(password === passwordConfirm)) {
    response.render("register-user", {
      errors: "senhas nao conferem",
    });
    return;
  }

  const md5Password = md5(password);
  const reqUser = {
    id: "123123123",
    name: name,
    email: email,
    password: md5Password,
  };

  const findEmail = await User.findOne({ where: { email: email } });
  if (findEmail === null) {
    try {
      const result = await User.create(reqUser);
      if (result.dataValues) {
        response.redirect("/login", 201);
      }
    } catch (e) {
      console.log("erro ao cadastrar novo usuario", e);
    }
  } else {
    console.log("email ja cadastrado");
    response.render("register-user", {
      errors: "Email já cadastrado",
    });
  }
};

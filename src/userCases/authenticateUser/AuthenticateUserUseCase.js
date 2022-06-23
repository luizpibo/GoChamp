const { Users } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthenticateUserUseCase {
  async execute(request) {
    //Obtendo dados do usuario
    const { nickname, password } = request;
    //Verificando se o usuario existe
    const user = await Users.findOne({ where: { nickname: nickname } });

    if (!user) {
      throw "Usuário não existente";
      // new Error("Nickname or password incorrect");
    }

    const userValues = user.dataValues;
    //Verificando se a senha está correta
    const passwordMatch = await bcrypt.compare(password, userValues.password);

    if (!passwordMatch) {
      throw "Nickname or password incorrect";
    }

    //Gerar token do usuario
    const JWT_token = jwt.sign({ id: userValues.id }, process.env.JWT_KEY, {
      subject: userValues.id,
      expiresIn: "1d",
    });

    return {
      JWT_token,
      userId: userValues.id,
      userNickName: userValues.nickname,
      isOwner: userValues.isOwner,
    };
  }
}

exports.module = AuthenticateUserUseCase;

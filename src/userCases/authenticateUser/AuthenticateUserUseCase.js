const { Users } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthenticateUserUseCase {
  async execute(request) {
    //Obtendo dados do usuario
    const { email, password } = request;
    //Verificando se o usuario existe
    const user = await Users.findOne({ where: { email: email } });

    if (!user) {
      throw new Error("Email or password incorrect");
    }

    const userValues = user.dataValues;
    //Verificando se a senha está correta
    const passwordMatch = await bcrypt.compare(password, userValues.password);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }

    //Gerar token do usuario
    const JWT_token = await jwt.sign({ id: userValues.id }, process.env.JWT_KEY, {
      subject: userValues.id,
      expiresIn: "1d",
    });
    
    return {
      JWT_token,
      userId: userValues.id,
    };
  }
}

exports.module = AuthenticateUserUseCase;

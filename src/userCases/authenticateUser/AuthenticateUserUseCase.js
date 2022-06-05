const { Users } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthenticateUserUseCase {
  async execute(request) {
    //Obtendo dados do usuario
    const { email, password } = request;

    //Verificando se o usuario existe
    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error("Email or password incorrect");
    }

    //Verificando se a senha está correta
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }

    //Gerar token do usuario
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      subject: user.id,
      expiresIn: "1d",
    });

    return token;
  }
}

exports.module = AuthenticateUserUseCase;

const { Users } = require("../../models");
const { hash } = require("bcryptjs");

class CreateUserUseCase {
  async execute({ name, email, password }) {
    const userAlreadyExists = await User.findOne({ where: { email: email } });
    if (userAlreadyExists) {
      throw new Error("Email já cadastrado");
    }
    const passwordHash = await hash(password, 8);

    const user = await Users.create({ name, email, password: passwordHash });

    return { menssage: "Usuário criado com sucesso" };
  }
}

exports.module = CreateUserUseCase;

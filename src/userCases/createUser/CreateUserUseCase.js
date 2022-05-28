const User = require("../../models/User");
const { hash } = require("bcryptjs");

class CreateUserUseCase {
  async execute({ name, email, password }) {
    const userAlreadyExists = await User.findOne({ where: { email: email } });
    if (userAlreadyExists) {
      throw new Error("Email já cadastrado");
    }
    const passwordHash = await hash(password, 8);

    const user = await User.create({ name, email, password: passwordHash });

    return user;
  }
}

exports.module = CreateUserUseCase;

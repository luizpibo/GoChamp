const CreateUserUseCase = require("./CreateUserUseCase");

class CreateUserController {
  async handle(request, response) {
    const { name, email, password } = request.body;
    const createUserUseCase = new CreateUserUseCase.module();
    const user = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}

exports.module = CreateUserController;

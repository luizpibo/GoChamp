const CreateUserUseCase = require("./CreateUserUseCase");

class CreateUserController {
  async handle(request, response) {
    const { name, email, password } = request.body;
    const { file } = request;
    const createUserUseCase = new CreateUserUseCase.module();

    try {
      const user = await createUserUseCase.execute({
        name,
        email,
        password,
        file,
      });
      console.log(user);
      if (user) {
        response.status(201).json({
          success: "usuario cadastrado",
        });
      } else {
        response.status(200).json({
          error: "Não foi possível criar o usuario",
        });
      }
    } catch (e) {
      response.status(200).json({
        error: e.Error,
      });
    }
  }
}

exports.module = CreateUserController;

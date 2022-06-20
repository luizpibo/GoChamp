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

      if (user) {
        response.json({
          success: "usuario cadastrado",
        });
      }
    } catch (e) {
      response.json({
        error: "Erro ao cadastrar o usuario",
      });
    }
  }
}

exports.module = CreateUserController;

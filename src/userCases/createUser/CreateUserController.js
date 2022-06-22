const CreateUserUseCase = require("./CreateUserUseCase");

class CreateUserController {
  async handle(request, response) {
    const { nickname, email, password } = request.body;
    const { file } = request;
    const createUserUseCase = new CreateUserUseCase.module();

    try {
      const user = await createUserUseCase.execute({
        nickname,
        email,
        password,
        file,
      });
      if (user) {
        response.status(201).json({
          success: true,
          success: "usuário cadastrado",
        });
      } else {
        response.json({
          success: false,
          success: "Erro ao cadastrar usuario",
        });
      }
    } catch (err) {
      response.json({
        success: false,
        error: err,
      });
    }
  }
}

exports.module = CreateUserController;

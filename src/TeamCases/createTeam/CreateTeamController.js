const CreateTeamUseCase = require("./CreateTeamUseCase");

class CreateUserController {
  async handle(request, response) {
    const { name, game, token } = request.body;
    const { file } = request;
    const createTeamUseCase = new CreateTeamUseCase.module();
    console.log("Preparando para criar time");
    console.log(name, game, token, file);
    const result = await createTeamUseCase.execute({
      name,
      game,
      token,
      file,
    });

    if (result) {
      return response.status(200).json({
        message: "Time criado com sucesso",
      });
    }

    return response.status(400).json({
      error: "Não foi possível criar o time",
    });
  }
}

exports.module = CreateUserController;

const CreateTeamUseCase = require("./CreateTeamUseCase");

class CreateUserController {
  async handle(request, response) {
    const { name, game, token } = request.body;
    const { file } = request;
    const createTeamUseCase = new CreateTeamUseCase.module();
    try {
      const team = await createTeamUseCase.execute({
        name,
        game,
        token,
        file,
      });
      if (team) {
        return response.status(200).json({
          success: "Time criado com sucesso",
        });
      }
      response.status(400).json({
        error: "Não foi possível criar o time",
      });
    } catch (e) {
      response.json({
        error: "Erro ao cadastrar o time",
      });
    }
  }
}

exports.module = CreateUserController;

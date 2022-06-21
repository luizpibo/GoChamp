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
        response.status(201).json({
          success: "Time criado com sucesso",
        });
      } else {
        response.status(200).json({
          error: "Não foi possível criar o time",
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

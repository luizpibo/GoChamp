const CreateTeamUseCase = require("./CreateTeamUseCase");

class CreateUserController {
  async handle(request, response) {
    const { name, game } = request.body;
    const { userId, isOwner } = request.session;
    const { file } = request;
    const createTeamUseCase = new CreateTeamUseCase.module();
    console.log("chegou aqui!!!");
    try {
      const team = await createTeamUseCase.execute({
        name,
        game,
        userId,
        file,
        isOwner,
      });

      if (team) {
        response.status(201).json({
          success: "Time criado com sucesso",
        });
      } else {
        response.json({
          error: "Não foi possível criar o time",
        });
      }
    } catch (e) {
      response.json({
        error: e,
      });
    }
  }
}

exports.module = CreateUserController;

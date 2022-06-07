const CreateTeamUseCase = require("./CreateTeamUseCase");

class CreateUserController {
  async handle(request, response) {
    const { name, game, token } = request.body;
    const createTeamUseCase = new CreateTeamUseCase.module();
    const team = await createTeamUseCase.execute({
      name,
      game,
      token,
    });

    if (team) {
      return response.redirect("/register-team");
    }

    return response.status(400).json({
      error: "Não foi possível criar o time",
    });
  }
}

exports.module = CreateUserController;

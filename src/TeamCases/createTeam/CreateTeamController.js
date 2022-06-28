const CreateTeamUseCase = require("./CreateTeamUseCase");

class CreateUserController {
  async handle(request, response) {
    const { name, game } = request.body;
    const { userId, isOwner } = request.session;
    const { file } = request;
    const createTeamUseCase = new CreateTeamUseCase.module();
    try {
      const team = await createTeamUseCase.execute({
        name,
        game,
        userId,
        file,
        isOwner,
      });
      console.log("time criado...");
      console.log(team);
      if (team) {
        response.session.isOwner = true;
        response.status(201).json({
          success: true,
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

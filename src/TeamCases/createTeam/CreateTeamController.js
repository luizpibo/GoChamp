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

      if (team) {
        if (!isOwner) {
          request.session.isOwner = true;
        }
        response.json({
          success: true,
        });
      }
    } catch (e) {
      console.log("error", e);
      response.json({
        error: e,
      });
    }
  }
}

exports.module = CreateUserController;

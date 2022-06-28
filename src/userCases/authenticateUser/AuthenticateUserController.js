const AuthenticateUserUseCase = require("./AuthenticateUserUseCase");
class AuthenticateUserController {
  async handle(request, response, next) {
    console.log("request body", request.body);
    const { nickname, password } = request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase.module();
    try {
      const authResponse = await authenticateUserUseCase.execute({
        nickname,
        password,
      });

      request.session.userId = authResponse.userId;
      request.session.userNickName = authResponse.userNickName;
      request.session.isOwner = authResponse.isOwner || false;

      response.json({
        success: true,
        ...authResponse,
      });
    } catch (err) {
      response.json({
        success: false,
        error: err,
      });
    }
  }
}

exports.module = AuthenticateUserController;

const AuthenticateUserUseCase = require("./AuthenticateUserUseCase");
class AuthenticateUserController {
  async handle(request, response, next) {
    const { email, password } = request.body;
    const authenticateUserUseCase = new AuthenticateUserUseCase.module();

    const token = await authenticateUserUseCase.execute({ email, password });
    return response.json(token);
  }
}

exports.module = AuthenticateUserController;

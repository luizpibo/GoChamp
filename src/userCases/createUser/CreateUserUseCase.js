const { Users } = require("../../models");
const { hash } = require("bcryptjs");
const fs = require("fs");
class CreateUserUseCase {
  async execute({ name, email, password, file }) {
    console.log("file", file);

    const userAlreadyExists = await Users.findOne({ where: { email: email } });
    if (userAlreadyExists) {
      throw new Error("Email já cadastrado");
    }

    const passwordHash = await hash(password, 8);
    const user = await Users.create({ name, email, password: passwordHash });
    const imagesPath = "./public/img/users_img_profiles/";
    const imgOldPath = imagesPath + file.filename;
    const newImageProfilePath = imagesPath + user.dataValues.id + ".jpg";

    fs.rename(imgOldPath, newImageProfilePath, async (err) => {
      if (err) {
        console.log("erro ao renomear arquivo");
      } else {
        user.set({
          imgProfileDir: user.dataValues.id,
        });
        await user.save();
      }
    });

    return user;
  }
}

exports.module = CreateUserUseCase;

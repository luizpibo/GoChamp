const { Users } = require("../../models");
const { hash } = require("bcryptjs");
const fs = require("fs");

class CreateUserUseCase {
  async execute({ name, email, password, file }) {
    const userAlreadyExists = await Users.findOne({ where: { email: email } });
    if (userAlreadyExists) {
      throw new Error("Email já cadastrado");
    }

    const passwordHash = await hash(password, 8);
    const newUser = await Users.create({ name, email, password: passwordHash });

    if (file) {
      const imagesPath = "./public/img/users_img_profiles/";
      const imgOldPath = imagesPath + file.filename;
      const newImageProfilePath = imagesPath + newUser.dataValues.id + ".jpg";
      fs.rename(imgOldPath, newImageProfilePath, async (err) => {
        if (err) {
          console.log("erro ao renomear arquivo");
        } else {
          newUser.set({
            imgProfileDir: newUser.dataValues.id + ".jpg",
          });
          await newUser.save();
        }
      });
    }
    if (newUser) {
      return newUser;
    }

    return null;
  }
}

exports.module = CreateUserUseCase;

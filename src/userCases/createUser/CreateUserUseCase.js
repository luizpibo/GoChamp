const { Users } = require("../../models");
const { hash } = require("bcryptjs");
const fs = require("fs");

class CreateUserUseCase {
  async execute({ nickname, email, password, file }) {
    const userEmailAlreadyExists = await Users.findOne({
      where: { email: email },
    });
    const userNicknameAlreadyExists = await Users.findOne({
      where: { nickname: nickname },
    });

    if (userEmailAlreadyExists) {
      throw "Email já cadastrado";
    }
    if (userNicknameAlreadyExists) {
      throw "Nickname já cadastrado";
    }

    const passwordHash = await hash(password, 8);
    const newUser = await Users.create({
      nickname,
      email,
      password: passwordHash,
    });

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

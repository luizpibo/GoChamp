const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/img/users_img_profiles");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now().toString() + "_" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const extensaoImg = ["image/jpg", "image/jpeg", "image/png"].find(
      (formatoAceito) => formatoAceito == file.mimetype
    );
    if (extensaoImg) {
      cb(null, true);
    }

    return cb(null, false);
  },
});

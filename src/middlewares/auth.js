let jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.id;
    if (req.query.userId && req.query.userId !== userId) {
      throw "User not authorized";
    } else {
      next();
    }
  } catch (err) {
    res.redirect("/login");
  }
};

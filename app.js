const db = require("./src/db.js");
const asyncErrors = require("express-async-errors");
//Importando bibliotecas
const hbs = require("express-handlebars");
const engine = hbs.engine({ extname: "hbs" });
const bodyParser = require("body-parser");
var express = require("express");
var createError = require("http-errors");

//Importando rotas
const indexRouter = require("./routes/index");
const profileRouter = require("./routes/profile");
const registerChampionshipRouter = require("./routes/register-championship");
const loginRouter = require("./routes/login");
const registerUser = require("./routes/register-user");
const dashboardRouter = require("./routes/dashboard");
const registerTeam = require("./routes/register-team");

//Criando aplicação express
const app = express();

//Definindo pasta publica
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// view engine setup (difinindo diretório de views)
app.engine(".hbs", engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

//Rotas index
app.use("/", indexRouter);
app.use("/profile", profileRouter);
app.use("/register-championship", registerChampionshipRouter);
app.use("/login", loginRouter);
app.use("/register-user", registerUser);
app.use("/dashboard", dashboardRouter);
app.use("/register-team", registerTeam);

// catch 404 and forward to error handler(rota 404)
app.use((error, request, response, next) => {
  return response.json({
    error: "Error",
    mennsage: error.mennsage,
  });
});

app.use(function (req, res, next) {
  res.render("404");
});

module.exports = app;

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
const teamsRouter = require("./routes/teams");
const championshipsRouter = require("./routes/championships");

//Criando aplicação express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//Definindo pasta publica
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
app.use("/teams", teamsRouter);
app.use("/championships", championshipsRouter);

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

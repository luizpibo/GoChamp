//Bibliotecas
var express = require("express");
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
const cookieParse = require("cookie-parser");
const sessions = require("express-session");

//Conexao com o banco de dados
const db = require("./src/db.js");

//Rotas
const {
  indexRoute,
  profileRoute,
  loginRoute,
  userRegisterRoute,
  dashboardRoute,
  teamsRoute,
  championshipsRoute,
  logoutRoute,
} = require("./routes/index");

//Criando aplicação express
const app = express();

//Definindo pasta publica
app.use(express.static("public"));

//Definindo tipos de requisicao aceitos
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParse());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Definindo cookies session
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: process.env.JWT_KEY,
    saveUnitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

// view engine setup (difinindo diretório de views)
const engine = hbs.engine({ extname: "hbs" });
app.engine(".hbs", engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

//Rotas index
app.use("/", indexRoute);
app.use("/login", loginRoute);
app.use("/profile", profileRoute);
app.use("/user-register", userRegisterRoute);
app.use("/dashboard", dashboardRoute);
app.use("/teams", teamsRoute);
app.use("/championships", championshipsRoute);
app.use("/logout", logoutRoute);

//404
app.use(function (req, res, next) {
  res.render("404");
});

module.exports = app;

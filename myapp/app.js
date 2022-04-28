const hbs = require("express-handlebars");
const engine = hbs.engine({extname: 'hbs'});

//Importando bibliotecas
var express = require("express");
var createError = require("http-errors");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");

//Importando rotas
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const sobreRouter = require("./routes/sobre");
const cadastrarCamp = require("./routes/cadastrar-campeonato");
//Criando aplicação express
const app = express();

app.use(express.static('public'));
// view engine setup (difinindo engine de views)
// view engine setup (difinindo diretório de views)
app.engine(".hbs", engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

//middleware
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//Rota index
app.use("/", indexRouter);

//Rota users
app.use("/users", usersRouter);
app.use("/sobre", sobreRouter);
app.use("/cadastrar-campeonato", cadastrarCamp);
// catch 404 and forward to error handler(rota 404)
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;

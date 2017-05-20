var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require("express-ejs-layouts");


var index = require('./routes/index');
var users = require('./routes/users');
var apiRouter = require("./routes/apiController");

const session = require("express-session");
const flash = require("connect-flash");
const auth = require('./helpers/auth-helpers');
const passport = require('./helpers/passport');

var authController = require('./routes/auth-controller');


var app = express();
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/friendstreet");


app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

app.use(session({
  secret: "hackaton",
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.set('layout', 'layouts/main-layout');


app.use("/api", apiRouter);
app.use('/', index);
app.use('/users', users);

app.use('/',authController);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

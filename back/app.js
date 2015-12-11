"use strict";
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var urlManager = require('./middlewares/url-manager');
var hbs = require('hbs');
var formpost=require(path.join(__dirname,'routes/formpost'));
let pages = require(path.join(__dirname, "models/pages"));

var admin = express();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//DYNAMIC ROUTES
app.use(urlManager())

//STATIC ROUTES
app.post('/formpost',formpost);
app.use('/admin', admin);

admin.get('/', function(req, res){
  // TODO verif si loggé sinon redirige sur /login
  res.sendFile(path.join(__dirname,'adminViews/page.html'));
});
admin.get('/login', function(req, res){
  res.sendFile(path.join(__dirname,'adminViews/login.html'));
});
admin.get('/page', function(req, res){
  res.sendFile(path.join(__dirname,'adminViews/page.html'));
});

admin.post('/page', function(req,res){
  let ob = req.body;

  pages.createPage(ob, function(err) {
    if (err) res.json(err.message);
    res.json({"message": "insertion was a success"});
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

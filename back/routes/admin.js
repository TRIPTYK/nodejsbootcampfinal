"use strict";
let express = require('express'),
  path = require('path'),
  fs = require('fs'),
  passport = require('passport'),
  Strategy = require('passport-local').Strategy,
  db = require('../db'),
  admin = express();

admin.use(require('cookie-parser')());
admin.use(require('body-parser').urlencoded({
  extended: true
}));
admin.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
admin.use(passport.initialize());
admin.use(passport.session());
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function(err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});



function authenticate(req,res,next) {
  if (req.isAuthenticated()){
     return next();
  }
   res.redirect('/admin/login');
}

admin.get('/', authenticate, function(req, res) {
  res.sendFile(path.join(process.cwd(), 'adminViews/page.html'));
});
admin.get('/login', function(req, res) {
  res.sendFile(path.join(process.cwd(), 'adminViews/login.html'));
});
admin.post('/login', passport.authenticate('local', {
  failureRedirect: '/admin/login',
  successRedirect: '/admin/page'
}))
admin.get('/page', authenticate, function(req, res) {
  res.sendFile(path.join(process.cwd(), 'adminViews/page.html'));
});

admin.post('/page', authenticate, function(req, res) {
  let ob = req.body;
  console.log(ob);
  pages.createPage(ob, function(err) {
    if (err) res.json(err.message);
    res.json({
      "message": "insertion was a success"
    });
  });
});

admin.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

module.exports = admin;

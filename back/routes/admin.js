"use strict";
let express = require('express'),
  path = require('path'),
  fs = require('fs'),
  admin = express.Router();


admin.get('/', function(req, res) {
  // TODO verif si loggé sinon redirige sur /login
  res.sendFile(path.join(process.cwd(), 'adminViews/page.html'));
});
admin.get('/login', function(req, res) {
  res.sendFile(path.join(process.cwd(), 'adminViews/login.html'));
});
admin.get('/page', function(req, res) {
  res.sendFile(path.join(process.cwd(), 'adminViews/page.html'));
});

admin.post('/page', function(req, res) {
  let ob = req.body;
  console.log(ob);
  pages.createPage(ob, function(err) {
    if (err) res.json(err.message);
    res.json({
      "message": "insertion was a success"
    });
  });
});

module.exports = admin;

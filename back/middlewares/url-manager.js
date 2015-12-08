"use strict";
let express = require('express'),
  path = require('path'),
  fs = require('fs'),
  router = express.Router();

function urlManager() {
  return function(req, res, next) {

    let pages = require(path.join(__dirname, "../models/pages"));

    let page = pages.getPageByUrl(req.url);
    res.render(page.template,page);
    // next();
  }
}

module.exports = urlManager;

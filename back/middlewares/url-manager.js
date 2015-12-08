"use strict";
let express = require('express'),
  path = require('path'),
  fs = require('fs'),
  router = express.Router();

function urlManager() {
  return function(req, res, next) {

    let pages = require(path.join(__dirname, "../models/pages"));
    let page = pages.getPageByUrl(req.url);
    console.log(page);
    if(page != undefined) res.render(page.template,page);
    else next();
  }
}

module.exports = urlManager;

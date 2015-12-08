"use strict";
let express = require('express'),
  path = require('path'),
  fs = require('fs'),
  router = express.Router();

function urlManager() {
  return function(req, res, next) {
    let pages = require(path.join(__dirname, "../models/pages"));
    let completePath = req.path;

    let pathBefore = completePath;
  //  console.log(pathBefore);
    let page;
    let urlValid = false;

    page = pages.getPageByUrl(completePath);
    if(page != undefined) urlValid = true;

    while(urlValid == false){
        pathBefore = path.dirname(pathBefore);
        page = pages.getPageByUrl(pathBefore);
        if(page != undefined) urlValid = true;
    }

    if(  pathBefore != "/" || completePath == "/" ) res.render(page.template,page);
    else next();

  }
}

module.exports = urlManager;

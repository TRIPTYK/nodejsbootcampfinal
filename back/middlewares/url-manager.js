"use strict";
let express = require('express'),
  path = require('path'),
  fs = require('fs'),
  router = express.Router();

function urlManager() {
  return function(req, res, next) {
    let pages = require(path.join(__dirname, "../models/pages"));
    let temp = req.path.substring(1);
    let pathBefore, pathAfter;
    console.log(temp);

    if(temp.indexOf("/") != -1){
      pathBefore = "/" + temp.substring(0, temp.indexOf("/"));
      pathAfter = temp.substring(temp.indexOf("/"));
      console.log(pathBefore + "     " + pathAfter);
    }else{
      pathBefore = "/" + temp;
    }
    let page = pages.getPageByUrl(pathBefore);
    res.render(page.template,page);
    // next();
  }
}

module.exports = urlManager;

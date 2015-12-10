"use strict";
let express = require('express'),
  path = require('path'),
  fs = require('fs'),
  router = express.Router();

function adminUrlManager() {
  return function(req, res, next) {

    let pages = require(path.join(__dirname, "../models/pages"));

    router.post('/page', function(req,res){
      let ob = req.body;
      console.log(ob);
      pages.createPage(ob, function(err) {
        if (err) res.json(err.message);
        res.json({"message": "insertion was a success"});
      });
    });


    // let page = pages.getPageByUrl(req.url);
    // if(page != undefined) res.render(page.template,page);
    // else next();
  }
}

module.exports = adminUrlManager;

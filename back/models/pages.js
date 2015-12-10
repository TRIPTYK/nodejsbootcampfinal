"use strict";
let path = require('path'),
  fs = require('fs'),
  jsonFile = path.join(__dirname, '../datas/pages.json'),
  _ = require('lodash');

function Pages(next) {
  let pages = null;
  let dataIsLoaded = false;

  function initModel(jsonURL) {
    fs.readFile(jsonURL, function(err, data) {
      if (err) throw err;
      pages = JSON.parse(data).pages;
      dataIsLoaded = true;
    });
  }

  function getPages() {
    if (dataIsLoaded) {
      return pages;
    } else {
      throw "Data is not loaded yet";
    }
  }

  function getPageByUrl(url) {
    if (dataIsLoaded) {
      let pageObj = _.find(pages,{
        "url": url
      });
      return validUrl(url);
    } else {
      throw "Data is not loaded yet";
    }
  }

  function validUrl(url){
    let bool = false;
    let pathBefore = url;
    let pageObj = _.find(pages,{
      "url": pathBefore
    });

    if(pageObj != undefined) bool = true;
    while(bool == false){
        pathBefore = path.dirname(pathBefore);
        pageObj = _.find(pages,{
          "url": pathBefore
        });
        if(pageObj != undefined) bool = true;
    }

    if(pathBefore == "/" && url != "/") bool = false;

    if(bool) return pageObj;
    else return undefined;
  }

  let that = {};
  that.getPages = getPages;
  that.getPageByUrl = getPageByUrl;
  initModel(jsonFile);
  return that;
}

/* SINGLETON CLASS DEFINITION */
Pages.instance = null;

/**
 * Singleton getInstance definition
 * @return tasks class
 */
Pages.getInstance = function() {
  if (this.instance === null) {
    this.instance = new Pages();
  }
  return this.instance;
};

module.exports = Pages.getInstance();
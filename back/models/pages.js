'use strict';
let path = require('path');
let fs = require('fs');
let jsonFile = path.join(__dirname, '../datas/pages.json');
let _ = require('lodash');

function Pages(next) {
  let pages = null;
  let dataIsLoaded = false;

  //PRIVATE
  function initModel(jsonURL) {
    fs.readFile(jsonURL, function(err, data) {
      if (err) throw err;
      pages = JSON.parse(data).pages;
      dataIsLoaded = true;
    });
  }

  function getPossibleUrl(urlStr) {
    console.log("getPossibleUrl");
    let tempArr = urlStr.split("/");
    return tempArr;
  }

  function findURLByUrl(urlStr) {
    console.log(getPossibleUrl(urlStr));
    let pageObj = _.find(pages, {
      "url": url
    });
    return pageObj;
  }


  //PUBLIC

  function getPageByUrl(url) {
    if (dataIsLoaded) {
      findURLByUrl(url);
      return pageObj;
    } else {
      throw "Data is not loaded yet";
    }
  }

  let that = {};
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

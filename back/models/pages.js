"use strict";
let path = require('path'),
  fs = require('fs'),
  jsonFile = path.join(__dirname, '../datas/pages.json');

function Pages() {
  let pages = null;
  function initModel(jsonURL) {
    fs.readFile(jsonURL, function(err, data) {
      if (err) throw err;
      pages= JSON.parse(data)
    });
  }

  function getPages()
  {
    return pages;
  }

  let that = {};
  that.getPages = getPages;
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

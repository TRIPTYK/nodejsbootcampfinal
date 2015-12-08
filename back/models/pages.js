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
    let tempArr = urlStr.split("/");
    tempArr = _.compact(tempArr);
    let urlArray=[];
    for (let i = tempArr.length; i >0 ; i--) {
      let tempUrl = "/"+tempArr.join("/");
      urlArray.push(tempUrl);
      tempArr.pop();
    }
    return urlArray;
  }

  function findURLByUrl(urlStr) {
    console.log(getPossibleUrl(urlStr));
    let pageObj = _.find(pages, {
      "url": url
    });
    if(!pageObj){

    }
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

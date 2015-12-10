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
    let urlArray = [];
    for (let i = tempArr.length; i > 0; i--) {
      let tempUrl = "/" + tempArr.join("/");
      urlArray.push(tempUrl);
      tempArr.pop();
    }
    return urlArray;
  }

  function findURLByUrl(urlStr) {
    let pageObj = null;
    if (urlStr !== "/") {
      let urlArr = getPossibleUrl(urlStr);
      let goodUrlIndex = null;

      for (let i = 0, l = urlArr.length; i < l; i++) {
        if (validUrl(urlArr[i])) {
          goodUrlIndex = i
          break;
        }
      }
      pageObj = _.find(pages, {
        "url": urlArr[goodUrlIndex]
      });
      if(  pageObj)pageObj.params = getParams(urlArr[goodUrlIndex], urlArr[0]);
    } else {
      pageObj = _.find(pages, {
        "url": "/"
      });
    }
    return pageObj;
  }

  function getParams(str1, str2) {
    let paramsArr = _.compact(str2.substr(str2.lastIndexOf(str1) + str1.length).split('/'));
    return paramsArr;
  }


  function validUrl(url) {
    let isValidUrl = false;
    let pageObj = _.find(pages, {
      "url": url
    });
    (pageObj) ? isValidUrl = true: isValidUrl = false;
    return isValidUrl;
  }
  function persistData(){

  fs.writeFile('datas/pages.json',pages,function(err){
    if (err) throw err;
    console.log("data well saved");
  })
  }
  //PUBLIC

  function getPageByUrl(url) {
    if (dataIsLoaded) {
      return findURLByUrl(url);
    } else {
      throw "Data is not loaded yet";
    }
  }

  function createPage(ob){
  // TODO
  // ajoutter la nouvelle page au json
  // ajoutter dans views un nouveau template
  pages.pages.push(
    {
      {
        "url": ob.url,
        "css": [{
          "link": "/css/"+ob.css+".css"
        }],
        "js": [{
          "link": "/js/"+ob.js+".js"
        }],
        "template": ob.template,
        "title" : ob.title
      }
    }
  );
  persistData();
}

  let that = {};
  that.getPageByUrl = getPageByUrl;
  that.createPage = createPage;
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

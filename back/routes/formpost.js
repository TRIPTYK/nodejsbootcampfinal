var express = require('express');
var router = express.Router();

/* GET recipes page. */
router.get('/formpost', function(req, res, next) {
  console.log("broll");
  res.render('formpost');
  next();

});

module.exports = router;

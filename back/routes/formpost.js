var express = require('express');
var router = express.Router();

/*POST FORM*/
router.post('/formpost', function(req, res, next) {
  console.log("eeee");
  res.render('formpost');

});

module.exports = router;

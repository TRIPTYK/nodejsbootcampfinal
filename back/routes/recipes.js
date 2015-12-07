var express = require('express');
var router = express.Router();

/* GET recipes page. */
router.get('/recipes', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

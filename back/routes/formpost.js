var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

/*POST FORM*/
router.post('/formpost', function(req, res, next) {
  console.log(req.body.name);
  var transporter = nodemailer.createTransport();
  transporter.sendMail({
      from: req.body.email,
      to: 'wendyfreedom31@hotmail.com',
      subject: req.body.name + " " + req.body.firstName,
      text: req.body.message
  });
//  res.render('formpost');

});

module.exports = router;

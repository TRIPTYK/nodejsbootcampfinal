var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

/*POST FORM*/
router.post('/formpost', function(req, res, next) {
  var options = {
    service: 'gmail',
    auth: {
      user: "",
      pass: ""
    }

  }
  var transporter = nodemailer.createTransport(smtpTransport(options));
  transporter.sendMail({
    from: req.body.email,
    to: 'gilles@triptyk.eu',
    subject: req.body.name + " " + req.body.firstName,
    text: req.body.message
  }, function(error, response) {

    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: " + response.message);
    }
  });
  //  res.render('formpost');

});

module.exports = router;

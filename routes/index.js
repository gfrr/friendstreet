var express = require('express');
var router = express.Router();
var Message = require("../models/message");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/dashboard", (req, res, next)=>{
  Message.find((err, messages)=>{
    if(err) next(err);
    res.render("dashboard", {messages});
  });

});

router.get('/signup_b', function(req, res, next) {
  res.render('users/signup_b', {account: req.body.account});
});

router.get('/signup_i', function(req, res, next) {
  res.render('users/signup_i', {account: req.body.account});
});

module.exports = router;

var express = require('express');
var router = express.Router();
const passport = require('../helpers/passport');
const Message = require("../models/message");


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

router.get('/post_i', function(req, res, next) {
  res.render('users/post_i');
});

router.post('/post_i', function(req, res, next) {

  const text = req.body.text;
  const tempTags = req.body.tags;
  const tags = tempTags.split(" ");

    const newPost = Message({
      text: text,
      tags: tags
    });
  res.redirect("/");

});

router.get('/post_b', function(req, res, next) {
  res.render('users/post_b');
});

router.post('/post_b', function(req, res, next) {



  var tmpRadius = req.body.radius;
  var tmpSize = req.body.size;
  var tmpDuration = req.body.duration;
  console.log(req.body.radius);

  switch (tmpRadius) {
    case "small":
      tmpRadius = 3000;
    break;
    case "medium":
      tmpRadius = 10000;
    break;
    case "long":
      tmpRadius = 20000;
    break;
  default:
  }

  switch (tmpSize) {
    case "1":
      tmpSize = 1;
    break;
    case "2":
      tmpSize = 2;
    break;
    case "3":
      tmpSize = 3;
    break;
  default:
  }

  switch (tmpDuration) {
    case "1":
      tmpDuration = 14400000;
    break;
    case "2":
      tmpDuration = 28800000;
    break;
    case "3":
      tmpDuration = 43200000;
    break;
  default:
  }

  const text = req.body.text.value;
  const tempTags = req.body.tags;
  const tags = tempTags.split(" ");
  const radius = tmpRadius;
  const size = tmpSize;
  const duration = tmpDuration;


    const newPost = Message({
      text: text,
      tags: tags,
      radius: radius,
      size: size,
      duration: duration
    });
  res.redirect("/");

});

module.exports = router;

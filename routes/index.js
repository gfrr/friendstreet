var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FriendStreet' });
});

router.get('/signup', function(req, res, next) {
  res.render('users/signup', {account: req.body.account});
});

module.exports = router;

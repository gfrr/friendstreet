var express = require('express');
var router = express.Router();

const Message = require("../models/message");
const User = require("../models/user");
const auth = require('../helpers/auth-helpers');


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

// router.get('/messagesTemporal', function(req, res, next) {
//   let longitude = 2.162862;
//   let latitude = 41.374865;
//   let maxDistance = 5000;
//   Message.where('loc').near({ center: { coordinates: [longitude, latitude], type: 'Point' }, maxDistance: maxDistance }).find((error, results) => {
// 		if (error) {
// 			//res.status(500).json({message: error});
//       //next(err);
//       console.log(err);
//       return;
// 		} else {
//       console.log("messages",results);
//       results = results.filter((result)=>{
//         console.log("result.loc.coordinates[0]  "+result.loc.coordinates[0]+" result.loc.coordinates[1]  "+result.loc.coordinates[1]+" result.radius "+result.radius);
//         let distance = auth.getDistance(result.loc.coordinates[1],result.loc.coordinates[0],latitude,longitude);
//         console.log("distance "+ distance+" result.radius "+ result.radius);
//         if(distance<result.radius){
//           return result;
//         }
//       });
//       console.log("messages",results);
//       res.send(results);
// 			//res.status(200).json(results);
//       //razzmatazz
//       // 41.397743, 2.191132
//       //paralel
//       // 41.374865, 2.162862
// 		}
// 	});
// });


// router.get('/messagesTemporal', function(req, res, next) {
//   let defaultTime=undefined;
//   Message.find({updatedAt : { $gte : new Date().getTime()-} }, function(err, docs){
//       console.log(docs);
//   });
//
// });


module.exports = router;

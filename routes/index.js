var express = require('express');
var router = express.Router();
const passport = require('../helpers/passport');
const Message = require("../models/message");
const User = require("../models/user");
const auth = require('../helpers/auth-helpers');

const moment  = require('moment');


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

router.get('/post_i', function(req, res, next) {
  res.render('users/post_i');
});

router.post('/post_i', function(req, res, next) {

  const text = req.body.text;
  const tempTags = req.body.tags;
  const tags = tempTags.split(" ");
  const coordinates = [];
  coordinates.push(req.body.lat);
  coordinates.push(req.body.lng);

  const newPost = Message({
    text: String(text),
    score: 0,
    tags: tags,
    loc: {
      type:"Point",
      coordinates: coordinates
    },
    expire: false,
  });

  console.log(newPost);

    console.log("this is the new post: ", newPost);

    newPost.save((err) => {
     if (err) {
       console.log(err);
       res.render('users/post_i', {
         errorMessage: "Something went wrong"
       });
     } else {
       res.redirect("/dashboard");
     }
   });

});

router.get('/post_b', function(req, res, next) {
  res.render('users/post_b');
});

router.post('/post_b', function(req, res, next) {

  var tmpRadius = req.body.radius;
  var tmpSize = req.body.size;
  var tmpDuration = req.body.duration;
  var radiusNumber;
  console.log("tmpRadius ", tmpRadius);
  console.log("tmpSize ", tmpSize);

  switch (tmpRadius) {
    case "short":
      radiusNumber = 3000;
    break;
    case "medium":
      radiusNumber = 10000;
    break;
    case "long":
      radiusNumber = 20000;
    break;
  default:
  }

  switch (tmpSize) {
    case "small":
      tmpSize = "1";
    break;
    case "medium":
      tmpSize = "2";
    break;
    case "large":
      tmpSize = "3";
    break;
  default:
  }

  switch (tmpDuration) {
    case "short":
      tmpDuration = 4;
    break;
    case "medium":
      tmpDuration = 8;
    break;
    case "long":
      tmpDuration = 12;
    break;
  default:
  }

  const text = req.body.text;
  const tempTags = req.body.tags;
  const tags = tempTags.split(" ");
  const radius = radiusNumber;
  const size = tmpSize;
  const duration = tmpDuration;
  const coordinates = [];
  coordinates.push(req.body.lat);
  coordinates.push(req.body.lng);
  console.log("coordinates ", coordinates);

    const newPost = Message({
      text: String(text),
      score: 0,
      tags: tags,
      loc: {
        type:"Point",
        coordinates: coordinates
      },
      radius: radius,
      expire: false,
      size: size,
      duration: Number(duration)
    });

    console.log("this is the new post: ", newPost);

    newPost.save((err) => {
     if (err) {
       console.log(err);
       res.render('users/post_b', {
         errorMessage: "Something went wrong"
       });
     } else {
       res.redirect("/dashboard");
     }
   });
 });


// router.get('/messagesTemporal', function(req, res, next) {
//   let longitude = 2.162862;
//   let latitude = 41.374865;
//   let maxDistance = 4000;
//   let defaultTime=-10;
//   Message.where('loc').near({ center: { coordinates: [longitude, latitude], type: 'Point' }, maxDistance: maxDistance }).find({expirationDate : { $gte : moment(new Date(new Date().getTime())).add({hours:defaultTime})}},(error, results) => {
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


module.exports = router;

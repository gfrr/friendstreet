var express = require('express');
var messageController = express.Router();
const passport = require('../helpers/passport');
const Message = require("../models/message");
const User = require("../models/user");
const auth = require('../helpers/auth-helpers');

const moment  = require('moment');

messageController.get("/dashboard", (req, res, next)=>{
  Message.find((err, messages)=>{
    if(err) next(err);
    res.render("dashboard", {messages});
  });

});

messageController.get('/post_i', function(req, res, next) {
  res.render('users/post_i');
});

messageController.post('/post_i', function(req, res, next) {

  const text = req.body.text;
  const tempTags = req.body.tags;
  const tags = tempTags.split(" ");

    const newPost = Message({
      text: text,
      tags: tags
    });

    console.log("this is the new post: ", newPost);

    newPost.save((err) => {
     if (err) {
       res.render('users/post_i', {
         errorMessage: "Something went wrong"
       });
     } else {
       res.redirect("/");
     }
   });

});

messageController.get('/post_b', function(req, res, next) {
  res.render('users/post_b');
});

messageController.post('/post_b', function(req, res, next) {

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
      tmpDuration = 14400000;
    break;
    case "medium":
      tmpDuration = 28800000;
    break;
    case "long":
      tmpDuration = 43200000;
    break;
  default:
  }

  const text = req.body.text;
  const tempTags = req.body.tags;
  const tags = tempTags.split(" ");
  const radius = radiusNumber;
  const size = tmpSize;
  const duration = tmpDuration;
console.log("RADIUS ", radius, radiusNumber);

    const newPost = Message({
      text: String(text),
      score: 0,
      tags: tags,
      loc: {
        type:"Point",
        coordinates:[0,0]
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
       res.redirect("/");
     }
   });
 });


messageController.get('/messagesTemporal', function(req, res, next) {
  let longitude = 2.162862;
  let latitude = 41.374865;
  let maxDistance = 4000;
  let defaultTime=-10;

  // const tempTags = req.body.tags;
  tempTags = "papa are pedito";
  const tags = tempTags.split(" ");
  querySelector = tags.map((tag)=>{
    return {tags:{$regex: tag }};
  });

  const isLocation=req.body.isLocation;
  const isExpiration = req.body.isExpiration;
  const isTags = req.body.isHashtag;
  const isScore = req.body.isScore;

  //Regular
  Message.find({},(error, results) => {
		if (error) {
			//res.status(500).json({message: error});
      //next(err);
      console.log(err);
      return;
		} else {
      console.log("messages",results);
      res.send(results);
			//res.status(200).json(results);
      //razzmatazz
      // 41.397743, 2.191132
      //paralel
      // 41.374865, 2.162862
		}
	});

  //Location
  Message.where('loc').near({ center: { coordinates: [longitude, latitude], type: 'Point' }, maxDistance: maxDistance },(error, results) => {
		if (error) {
			//res.status(500).json({message: error});
      //next(err);
      console.log(err);
      return;
		} else {
      console.log("messages",results);
      results = results.filter((result)=>{
        console.log("result.loc.coordinates[0]  "+result.loc.coordinates[0]+" result.loc.coordinates[1]  "+result.loc.coordinates[1]+" result.radius "+result.radius);
        let distance = auth.getDistance(result.loc.coordinates[1],result.loc.coordinates[0],latitude,longitude);
        console.log("distance "+ distance+" result.radius "+ result.radius);
        if(distance<result.radius){
          return result;
        }
      });
      console.log("messages",results);
      res.send(results);
			//res.status(200).json(results);
      //razzmatazz
      // 41.397743, 2.191132
      //paralel
      // 41.374865, 2.162862
		}
	});

  //Time
  Message.find({expirationDate : { $gte : moment(new Date(new Date().getTime())).add({hours:defaultTime})}},(error, results) => {
		if (error) {
			//res.status(500).json({message: error});
      //next(err);
      console.log(err);
      return;
		} else {
      console.log("messages",results);
      res.send(results);
			//res.status(200).json(results);
      //razzmatazz
      // 41.397743, 2.191132
      //paralel
      // 41.374865, 2.162862
		}
	});

  //Time+Location
  Message.where('loc').near({ center: { coordinates: [longitude, latitude], type: 'Point' }, maxDistance: maxDistance }).find({expirationDate : { $gte : moment(new Date(new Date().getTime())).add({hours:defaultTime})}},(error, results) => {
		if (error) {
			//res.status(500).json({message: error});
      //next(err);
      console.log(err);
      return;
		} else {
      console.log("messages",results);
      results = results.filter((result)=>{
        console.log("result.loc.coordinates[0]  "+result.loc.coordinates[0]+" result.loc.coordinates[1]  "+result.loc.coordinates[1]+" result.radius "+result.radius);
        let distance = auth.getDistance(result.loc.coordinates[1],result.loc.coordinates[0],latitude,longitude);
        console.log("distance "+ distance+" result.radius "+ result.radius);
        if(distance<result.radius){
          return result;
        }
      });
      console.log("messages",results);
      res.send(results);
			//res.status(200).json(results);
      //razzmatazz
      // 41.397743, 2.191132
      //paralel
      // 41.374865, 2.162862
		}
	});

  //Time+Location+Hash
  Message.where('loc').near({ center: { coordinates: [longitude, latitude], type: 'Point' }, maxDistance: maxDistance }).find({$and:[{ $or:querySelector},{expirationDate : { $gte : moment(new Date(new Date().getTime())).add({hours:defaultTime})}}]},(error, results) => {
		if (error) {
			//res.status(500).json({message: error});
      //next(err);
      console.log(err);
      return;
		} else {
      console.log("messages",results);
      results = results.filter((result)=>{
        console.log("result.loc.coordinates[0]  "+result.loc.coordinates[0]+" result.loc.coordinates[1]  "+result.loc.coordinates[1]+" result.radius "+result.radius);
        let distance = auth.getDistance(result.loc.coordinates[1],result.loc.coordinates[0],latitude,longitude);
        console.log("distance "+ distance+" result.radius "+ result.radius);
        if(distance<result.radius){
          return result;
        }
      });
      console.log("messages",results);
      res.send(results);
			//res.status(200).json(results);
      //razzmatazz
      // 41.397743, 2.191132
      //paralel
      // 41.374865, 2.162862
		}
	});

  //Time+Location+Score
  Message.where('loc').near({ center: { coordinates: [longitude, latitude], type: 'Point' }, maxDistance: maxDistance }).find({expirationDate : { $gte : moment(new Date(new Date().getTime())).add({hours:defaultTime})}}).sort({score: -1}).exec((error, results)=> {
		if (error) {
			//res.status(500).json({message: error});
      //next(err);
      console.log(err);
      return;
		} else {
      console.log("messages",results);
      results = results.filter((result)=>{
        console.log("result.loc.coordinates[0]  "+result.loc.coordinates[0]+" result.loc.coordinates[1]  "+result.loc.coordinates[1]+" result.radius "+result.radius);
        let distance = auth.getDistance(result.loc.coordinates[1],result.loc.coordinates[0],latitude,longitude);
        console.log("distance "+ distance+" result.radius "+ result.radius);
        if(distance<result.radius){
          return result;
        }
      });
      console.log("messages",results);
      res.send(results);
			//res.status(200).json(results);
      //razzmatazz
      // 41.397743, 2.191132
      //paralel
      // 41.374865, 2.162862
		}
	});

  //Time+Location+Hash+Score
  Message.where('loc').near({ center: { coordinates: [longitude, latitude], type: 'Point' }, maxDistance: maxDistance }).find({$and:[{ $or:querySelector},{expirationDate : { $gte : moment(new Date(new Date().getTime())).add({hours:defaultTime})}}]}).sort({score: -1}).exec((error, results)=> {
		if (error) {
			//res.status(500).json({message: error});
      //next(err);
      console.log("hi");
      console.log(err);
      return;
		} else {
      console.log("messages",results);
      results = results.filter((result)=>{
        console.log("result.loc.coordinates[0]  "+result.loc.coordinates[0]+" result.loc.coordinates[1]  "+result.loc.coordinates[1]+" result.radius "+result.radius);
        let distance = auth.getDistance(result.loc.coordinates[1],result.loc.coordinates[0],latitude,longitude);
        console.log("distance "+ distance+" result.radius "+ result.radius);
        if(distance<result.radius){
          return result;
        }
      });
      console.log("messages",results);
      res.send(results);
			//res.status(200).json(results);
      //razzmatazz
      // 41.397743, 2.191132
      //paralel
      // 41.374865, 2.162862
		}
	});
});

module.exports = messageController;

var express = require('express');
var messageController = express.Router();
const passport = require('../helpers/passport');
const Message = require("../models/message");
const User = require("../models/user");
const auth = require('../helpers/auth-helpers');

const moment  = require('moment');

messageController.get('/', auth.ifAlreadyLoggedIn('/dashboard'), function(req, res, next) {
  res.render('index');
});

messageController.get('/post_i', function(req, res, next) {
  res.render('users/post_i');
});

messageController.post('/post_i', function(req, res, next) {

  const text = req.body.text;
  const tags = req.body.tags;
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
    userId: req.user,
    expirationDate: moment(new Date(new Date().getTime())).add({hours:1}),
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
      userId: req.user,
      expirationDate: moment(new Date(new Date().getTime())).add({hours:Number(duration)}),
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


messageController.post('/dashboard', function(req, res, next) {
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

  console.log("0",req.user);

  const isLocation=req.body.isLocation;
  const isExpiration = req.body.isExpiration;
  const isTags = req.body.isHashtag;
  const isScore = req.body.isScore;

  console.log("isLocation "+ isLocation + " isExpiration " + isExpiration );
  console.log("isScore "+ isScore + " isTags " + isTags );

  if(!isLocation && !isExpiration && !isTags && (!isTags.length)){
    //Regular
    Message.find({}).populate("userId").exec((error, messages) => {
  		if (error) {
        console.log(err);
        return;
  		} else {
        console.log("hi");
        console.log("messages",messages);
        res.render("dashboard", {messages});
  		}
  	});
  }


  else if(isLocation && !isExpiration && !isScore && (!isTags.length)){
    //Location
    User.findById({_id:req.user.id},(err,user)=>{
      if(err){
        return;
      }
      console.log("0",user.coordinates[0]);
      Message.where('loc').near({ center: { coordinates: [longitude, latitude], type: 'Point' }, maxDistance: maxDistance },(error, messages) => {
    		if (error) {
    			//res.status(500).json({message: error});
          //next(err);
          console.log(err);
          return;
    		} else {
          console.log("messages",messages);
          messages = messages.filter((result)=>{
            console.log("result.loc.coordinates[0]  "+result.loc.coordinates[0]+" result.loc.coordinates[1]  "+result.loc.coordinates[1]+" result.radius "+result.radius);
            let distance = auth.getDistance(result.loc.coordinates[1],result.loc.coordinates[0],latitude,longitude);
            console.log("distance "+ distance+" result.radius "+ result.radius);
            if(distance<result.radius){
              return result;
            }
          });
          console.log("messages",messages);
          res.render("dashboard", {messages});
          //res.send(results);
    			//res.status(200).json(results);
          //razzmatazz
          // 41.397743, 2.191132
          //paralel
          // 41.374865, 2.162862
    		}
    	});
    });

  }else if(!isLocation && isExpiration && !isScore && (!isTags.length)){
    //Time
    Message.find({expirationDate : { $gte : moment(new Date(new Date().getTime())).add({hours:defaultTime})}},(error, messages) => {
  		if (error) {
  			//res.status(500).json({message: error});
        //next(err);
        console.log(err);
        return;
  		} else {
        console.log("messages",messages);
        res.render("dashboard", {messages});
  			//res.status(200).json(results);
        //razzmatazz
        // 41.397743, 2.191132
        //paralel
        // 41.374865, 2.162862
  		}
  	});
  }else if(isLocation && isExpiration && !isScore && (!isTags.length)){
    //Time+Location
    Message.where('loc').near({ center: { coordinates: [longitude, latitude], type: 'Point' }, maxDistance: maxDistance }).find({expirationDate : { $gte : moment(new Date(new Date().getTime())).add({hours:defaultTime})}},(error, messages) => {
  		if (error) {
  			//res.status(500).json({message: error});
        //next(err);
        console.log(err);
        return;
  		} else {
        console.log("messages",messages);
        messages = messages.filter((result)=>{
          console.log("result.loc.coordinates[0]  "+result.loc.coordinates[0]+" result.loc.coordinates[1]  "+result.loc.coordinates[1]+" result.radius "+result.radius);
          let distance = auth.getDistance(result.loc.coordinates[1],result.loc.coordinates[0],latitude,longitude);
          console.log("distance "+ distance+" result.radius "+ result.radius);
          if(distance<result.radius){
            return result;
          }
        });
        console.log("messages",messages);
        res.render("dashboard", {messages});
  			//res.status(200).json(results);
        //razzmatazz
        // 41.397743, 2.191132
        //paralel
        // 41.374865, 2.162862
  		}
  	});

  }else if(isLocation && isExpiration && isScore && (isTags.length)){
    //Time+Location+Hash
    Message.where('loc').near({ center: { coordinates: [longitude, latitude], type: 'Point' }, maxDistance: maxDistance }).find({$and:[{ $or:querySelector},{expirationDate : { $gte : moment(new Date(new Date().getTime())).add({hours:defaultTime})}}]},(error, messages) => {
  		if (error) {
  			//res.status(500).json({message: error});
        //next(err);
        console.log(err);
        return;
  		} else {
        console.log("messages",messages);
        messages = messages.filter((result)=>{
          console.log("result.loc.coordinates[0]  "+result.loc.coordinates[0]+" result.loc.coordinates[1]  "+result.loc.coordinates[1]+" result.radius "+result.radius);
          let distance = auth.getDistance(result.loc.coordinates[1],result.loc.coordinates[0],latitude,longitude);
          console.log("distance "+ distance+" result.radius "+ result.radius);
          if(distance<result.radius){
            return result;
          }
        });
        console.log("messages",messages);
        res.render("dashboard", {messages});
  			//res.status(200).json(results);
        //razzmatazz
        // 41.397743, 2.191132
        //paralel
        // 41.374865, 2.162862
  		}
  	});

  }else if(isLocation && isExpiration && isScore && (!isTags.length)){
    //Time+Location+Score
    Message.where('loc').near({ center: { coordinates: [longitude, latitude], type: 'Point' }, maxDistance: maxDistance }).find({expirationDate : { $gte : moment(new Date(new Date().getTime())).add({hours:defaultTime})}}).sort({score: -1}).exec((error, messages)=> {
  		if (error) {
  			//res.status(500).json({message: error});
        //next(err);
        console.log(err);
        return;
  		} else {
        console.log("messages",messages);
        messages = messages.filter((result)=>{
          console.log("result.loc.coordinates[0]  "+result.loc.coordinates[0]+" result.loc.coordinates[1]  "+result.loc.coordinates[1]+" result.radius "+result.radius);
          let distance = auth.getDistance(result.loc.coordinates[1],result.loc.coordinates[0],latitude,longitude);
          console.log("distance "+ distance+" result.radius "+ result.radius);
          if(distance<result.radius){
            return result;
          }
        });
        console.log("messages",messages);
        res.render("dashboard", {messages});
  			//res.status(200).json(results);
        //razzmatazz
        // 41.397743, 2.191132
        //paralel
        // 41.374865, 2.162862
  		}
  	});
  }else if(isLocation && isExpiration && isScore && (!isTags.length)){
    //Time+Location+Hash+Score
    Message.where('loc').near({ center: { coordinates: [longitude, latitude], type: 'Point' }, maxDistance: maxDistance }).find({$and:[{ $or:querySelector},{expirationDate : { $gte : moment(new Date(new Date().getTime())).add({hours:defaultTime})}}]}).sort({score: -1}).exec((error, messages)=> {
  		if (error) {
  			//res.status(500).json({message: error});
        //next(err);
        console.log("hi");
        console.log(err);
        return;
  		} else {
        console.log("messages",messages);
        messages = messages.filter((result)=>{
          console.log("result.loc.coordinates[0]  "+result.loc.coordinates[0]+" result.loc.coordinates[1]  "+result.loc.coordinates[1]+" result.radius "+result.radius);
          let distance = auth.getDistance(result.loc.coordinates[1],result.loc.coordinates[0],latitude,longitude);
          console.log("distance "+ distance+" result.radius "+ result.radius);
          if(distance<result.radius){
            return result;
          }
        });
        console.log("messages",messages);
        res.render("dashboard", {messages});
  			//res.status(200).json(results);
        //razzmatazz
        // 41.397743, 2.191132
        //paralel
        // 41.374865, 2.162862
  		}
  	});
  }
});

messageController.get('/dashboard', function(req, res, next) {
  //Regular
  Message.find({}).populate("userId").exec((error, messages) => {
		if (error) {
      console.log(err);
      return;
		} else {
      console.log("hi");
      console.log("messages",messages);
      res.render("dashboard", {messages});
		}
	});
});

module.exports = messageController;

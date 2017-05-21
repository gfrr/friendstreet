const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Message = require('../models/message');


router.route('/users')
	.get((req, res) => {
	  User.find((error, users) => {
	  	if (error) res.status(500).json({message: error});
	  	 else res.status(200).json(users);
	  });
	});



router.get('/users/:user_id', (req, res) => {
		User.findById(req.params.user_id, (error, user) => {
			if (error) res.status(500).json({message: error});
			 else {
				console.log(user);
				res.status(200).json(user);
			}
		});
	});


router.get("/messages", (req, res, next)=> {
		Message.find((error, users) => {

			if (error) res.status(500).json({message: error});
			 else res.status(200).json(users);
		});
	});


	router.get('/messages/:message_id', (req, res) => {
			Message.findById(req.params.message_id, (error, message) => {
				if (error) res.status(500).json({message: error});
				 else {
					console.log(message);
					res.status(200).json(message);
				}
			});
		});


	router.patch('/messages/:message_id', (req, res)=> {
		console.log(req.body);
		Message.findByIdAndUpdate(req.params.message_id, req.body, {new: true}, (err, message)=>{
			if(err) res.status(500).json({message: err});
			else res.status(200).json("message updated");
		});
	});


module.exports = router;

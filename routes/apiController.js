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



module.exports = router;

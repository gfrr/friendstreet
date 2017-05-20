const express = require("express");
const authController = express.Router();

const Message = require("../models/message");
const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const passport = require("passport");

const auth = require('../helpers/auth-helpers');


authController.get("/", (req, res, next) => {
  res.render("maintemporal");
});

authController.get("/login", (req, res, next) => {
  res.render("logintemporal", {
    "message": req.flash("error")
  });
});

authController.post("/login", passport.authenticate("local",{
  successRedirect: "/main",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

authController.get("/signup", (req,res,next)=>{
  console.log("hi");
  res.render("signuptemporal");
});

authController.post("/signup", (req,res,next)=>{
  const firstName = req.body.firstName;
  const lastName  = req.body.lastName;
  const email     = req.body.email;
  const password  = req.body.password;
  const avatar    = req.body.avatar;
  const role      = req.body.role;
  const street    = req.body.street;
  const postCode  = req.body.postCode;
  const city      = req.body.city;
  const lat       = req.body.lat;
  const lng       = req.body.lng;

  const address   = {
    street      : street,
    postCode    :postCode,
    city        :city,
    country     :country,
    coordinates : [lat,lng]
  };

  if (email === "" || password === "") {
    res.render("signuptemporal", {
      message: "Indicate email, password"
    });
    return;
  }

  User.findOne({$or:[{username:username},{email:email}]}, "username email", (err, user) => {
    if (user !== null) {
      res.render("intranet/auth/signup", {
        message: "The username or email already exists"
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      firstName   : firstName,
      lastName    : lastName,
      email       : email,
      password    : hashPass,
      avatar      : avatar,
      role        : role,
      address     : address,
      coordinates : coordinates
    });

    newUser.save((err,user) => {
      if (err) {
        res.render("signuptemporal", {
          message: "Something went wrong"
        });
        return;
      }
    });

  });

});

module.exports = authController;

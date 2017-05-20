const express = require("express");
const authController = express.Router();

const Message = require("../models/message");
const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const passport = require("passport");

const auth = require('../helpers/auth-helpers');


authController.get("/main", (req, res, next) => {
  res.render("maintemporal");
});

authController.get("/loginTemporal", (req, res, next) => {
  res.render("logintemporal", {
    "message": req.flash("error")
  });
});

authController.post("/loginTemporal", passport.authenticate("local",{
  successRedirect: "/main",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

authController.get("/signup_i", (req,res,next)=>{
  console.log("hi");
  res.render("signup_i");
});

authController.get("/signup_b", (req,res,next)=>{
  console.log("hi");
  res.render("signup_b");
});

authController.post("/signup", (req,res,next)=>{
  console.log("hi");
  const firstName = req.body.firstName;
  const lastName  = req.body.lastName;
  const email     = req.body.email;
  const password  = req.body.password;
  const role      = req.body.role;
  console.log("hi2");
  if (email === "" || password === "") {
    if(role==='Business'){
      res.render("signup_b", {
        message: "Indicate email, password"
      });
      return;
    }

    res.render("signup_i", {
      message: "Indicate email, password"
    });
    return;
  }
  console.log("hi3");
  User.findOne({email:email}, (err, user) => {
    if (user !== null) {
      if(role==='Business'){
        res.render("signup_b", {
          message: "The username or email already exists"
        });
        return;
      }

      res.render("signup_i", {
        message: "The username or email already exists"
      });
      return;

    }
    console.log("hi4");
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      firstName   : firstName,
      lastName    : lastName,
      email       : email,
      password    : hashPass,
      role        : role
    });
    console.log("hi5");
    newUser.save((err,user) => {
      if (err) {
        if(role==='Business'){
          res.render("signup_b", {
            message: "Something went wrong"
          });
          return;
        }

        res.render("signup_i", {
        message: "Something went wrong"
        });
      }
        res.redirect("/main");
        console.log("hi5");
        return;
    });
  });
});

module.exports = authController;

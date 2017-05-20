const mongoose = require('mongoose');
const faker = require("faker");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require("../models/user");
const Message = require("../models/message");




mongoose.connect("mongodb://localhost:27017/friendstreet");

//returns an array of random users with the userType role
function createUserType(number, userType,  password = "test" ){
  let users = [];

  for(let i = 0; i < number; i++){
    name = faker.name.findName();
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const address = faker.helpers.createCard().address;
    users.push({
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      email: faker.internet.email(name),
      avatar: faker.internet.avatar(),
      password: hashPass,
      address: {
        street: address.streetC,
        city: address.city,
        country: address.country,
        coordinates: [Number(address.geo.lat), Number(address.geo.lng)],
      },
      role: userType,
      itemsUser: [],
    });
  }
  return users;
}


const usersData = createUserType(100, "User");

User.create(usersData, (err, docs)=> {
  if(err) throw err;
  mongoose.connection.close();
});

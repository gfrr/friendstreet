const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Message = require("./message");


const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  avatar: {type:String, default:""},
  address:{
    street: String,
    postCode: String,
    city: String,
    country: String,
    coordinates: [Number, Number] //lat and lng
  },
  role: {
    type: String,
    enum: ['User','Owner','Professional','Admin'],
    default: 'User'
  },
  messages: [{type: Schema.Types.ObjectId, ref: "Message"}]
});



const User = mongoose.model("User", userSchema);
module.exports = User;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./user");

const messageSchema = new Schema({
  text: "string",
  label: {
      type: String,
      enum: ['Event', 'Warning', 'Business', 'Regular', 'City'],
      default: 'Regular'
    },
  coordinates: [Number, Number],
  userId: { type: Schema.Types.ObjectId, ref: 'User' }

});



const Message = mongoose.model("Message", messageSchema);
module.exports = User;

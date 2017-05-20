const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./user");

const messageSchema = new Schema({
  text        : String,
  score       : Number,
  tags        :[String],
  loc         :{
    type:{type:String},
    coordinates:[Number]
  },
  radius      : {type:Number, default:2000},
  expire      : {type:Boolean, default:false},
  size        : {
    type: String,
    enum: ["1","2","3"],
    default: "1"
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }

}, {timestamps: {
  createdAt: "created_at",
  updatedAt: "updated_at"}
});

messageSchema.index({ "loc": "2dsphere" });

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;

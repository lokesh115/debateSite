const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    uname: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},
    gender: {type:String},
    age: {type:Number}
})

const User = mongoose.model("User",userSchema)

module.exports = User
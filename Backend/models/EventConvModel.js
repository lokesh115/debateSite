const mongoose = require("mongoose");

let Message = new mongoose.Schema({
    uname: String,
    message: String,
    type: String,
    timestamp: Date,
})

let eventConvSchema = new mongoose.Schema({
    event_id: {type:Number,required:true},
    admins: [String],
    members: [String],
    transcript: [Message]
})

const EventConv = mongoose.model("EventConv",eventConvSchema)

module.exports = EventConv
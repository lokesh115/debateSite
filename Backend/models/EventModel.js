const mongoose = require("mongoose");

let eventSchema = new mongoose.Schema({
    title: {type:String,required:true},
    desc: {type:String,required:true},
    hosted_by: {type:String,required:true},
    type: {type:String},
    event_id: {type:Number},
    event_passcode: {type:String}
})

const Event = mongoose.model("Event",eventSchema)

module.exports = Event
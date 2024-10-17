const EventModel = require("../models/EventModel");
const EventConvModel = require("../models/EventConvModel");

function createNewEvent(eventData){
    const newEvent = new EventModel({"title":eventData.title,"desc":eventData.desc,"hosted_by":eventData.hosted_by,"type":eventData.type,"event_id":eventData.event_id,"event_passcode":eventData.event_passcode});
    newEvent.save();

    const newEventConv = new EventConvModel({
        "event_id":eventData.event_id,
        "admins": [eventData.hosted_by],
        "members": [eventData.hosted_by],
        "transcript": [{
            "uname": eventData.hosted_by.EventConvModel,
            "message": "Event Created",
            "type":"sys",
            "timestamp":new Date()
        }]
    });
    newEventConv.save()

    return newEvent;
}

async function generateEventId(){
    return Math.floor(1000 + Math.random() * 9000);
}

async function fetchAllEvents(){
    const allEvents = await EventModel.find();
    return allEvents
}

async function fetchAllPublicEvents(){
    const allEvents = await EventModel.find({"type":"public"});
    return allEvents
}

async function fetchAllUserAndPublicEvents(uname){
    const publicEvents = await EventModel.find({"type":"public"});
    const userEvents = await EventModel.find({"hosted_by":uname});
    const allEvents = [...new Set([...publicEvents, ...userEvents])];
    return allEvents
}

async function fetchAnEvent(event_id){
    const event = await EventModel.find({"event_id":event_id});
    return event;
}

async function addMemberToEvent(event_id,uname){
    try{
        let eventConvRes = await EventConvModel.findOne({ "event_id": event_id });
        if(eventConvRes.members.includes(uname)){
            throw new Error('Member already present');
        }
        let result = await EventConvModel.updateOne({ "event_id": event_id }, { "$push" : {"members": uname} })
        if (result.modifiedCount === 0) {
            throw new Error('No event found with the given ID or member already added.');
        }
        else{
            return {"message":"Member added : "+uname}
        }
    }
    catch(err){
        return {"message":err.message}
    }
}

async function fetchEventConv(event_id,uname){
    try{
        const eventConv = await EventConvModel.find({"event_id":event_id});
        return eventConv;
    }
    catch(err){
        return {"message":err.message}
    }
}

async function addMessageToTranscript(event_id,uname,msg,timestamp,type){
    const MessageObj = {
        "uname":uname,
        "message":msg,
        "type":type,
        "timestamp":timestamp
    }
    try{
        const eventConv = await EventConvModel.updateOne({ "event_id": event_id }, { "$push" : {"transcript": MessageObj} })
        return eventConv;
    }
    catch(err){
        return {"message":err.message}
    }
}

module.exports = {generateEventId,createNewEvent,fetchAllEvents,fetchAnEvent,fetchAllPublicEvents,fetchAllUserAndPublicEvents,addMemberToEvent,fetchEventConv,addMessageToTranscript};
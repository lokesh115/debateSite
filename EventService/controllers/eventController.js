const EventModel = require("../models/EventModel");

function createNewEvent(eventData){
    const newEvent = new EventModel({"title":eventData.title,"desc":eventData.desc,"hosted_by":eventData.hosted_by,"type":eventData.type,"event_id":eventData.event_id,"event_passcode":eventData.event_passcode});
    newEvent.save();
    return newEvent;
}

async function fetchAllEvents(){
    const allEvents = await EventModel.find();
    return allEvents;
}

async function fetchAnEvent(userData){
    const event = await EventModel.findOne({"uname":userData.uname});
    return event;
}

module.exports = {createNewEvent,fetchAllEvents,fetchAnEvent};
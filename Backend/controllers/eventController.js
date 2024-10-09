const EventModel = require("../models/EventModel");

function createNewEvent(eventData){
    const newEvent = new EventModel({"title":eventData.title,"desc":eventData.desc,"hosted_by":eventData.hosted_by,"type":eventData.type,"event_id":eventData.event_id,"event_passcode":eventData.event_passcode});
    newEvent.save();
    return newEvent;
}

async function generateEventId(){
    return 1111;
}

async function fetchAllEvents(){
    const allEvents = await EventModel.find();
    return allEvents
}

async function fetchAnEvent(eventData){
    const event = await EventModel.findOne({"event_id":eventData.event_id});
    return event;
}

module.exports = {generateEventId,createNewEvent,fetchAllEvents,fetchAnEvent};
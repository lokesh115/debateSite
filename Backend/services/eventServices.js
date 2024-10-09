const {generateEventId,createNewEvent,fetchAllEvents,fetchAnEvent} = require("../controllers/eventController")

async function registerNewEvent(req,res){
    let eventId = await generateEventId();
    console.log(eventId)
    req.body.event_id = eventId;
    const eventData = await createNewEvent(req.body)
    console.log("New event  created : "+eventData.event_id)
    res.json(eventData)
    
}

async function getAllEvents(req,res){
    const eventsData = await fetchAllEvents()
    res.send(eventsData)
}

async function getAnEvent(req,res){
    const eventData = await fetchAnEvent(req.params)
    res.json(eventData)
}

module.exports = {registerNewEvent,getAllEvents,getAnEvent}
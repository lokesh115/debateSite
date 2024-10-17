const {generateEventId,createNewEvent,fetchAllEvents,fetchAnEvent,fetchAllPublicEvents,fetchAllUserAndPublicEvents,addMemberToEvent,fetchEventConv,addMessageToTranscript} = require("../controllers/eventController")

async function registerNewEvent(req,res){
    let eventId = await generateEventId();
    req.body.event_id = eventId;
    const eventData = await createNewEvent(req.body)
    res.json(eventData)
    
}

async function getAllUserAndPublicEvents(req,res){
    const uname = req.query.uname
    const eventsData = await fetchAllUserAndPublicEvents(uname)
    res.send(eventsData)
}

async function getAnEvent(req,res){
    const eventData = await fetchAnEvent(req.query.eventid)
    res.json(eventData)
}

async function joinAnEvent(req,res){
    const eventData = await fetchAnEvent(req.body.eventid)
    if(eventData=={}){
        res.json({message:"Event not found"})
    }
    else{
        let result = await addMemberToEvent(req.body.event_id,req.body.uname)
        res.json(result)
    }
}

async function getAllEventDetails(req,res){
    let eventData = await fetchAnEvent(req.query.event_id)
    eventData = eventData[0].toObject()
    let eventConvData = await fetchEventConv(req.query.event_id)
    eventConvData = eventConvData[0].toObject()
    
    
    const allEventData = {...eventData, ...eventConvData};
    res.send(allEventData)

}

async function sendMessage(req,res){
    try{
        let messageRes = await addMessageToTranscript(req.body.event_id,req.body.uname,req.body.message,req.body.timestamp,req.body.type)
        res.json(messageRes)
    }
    catch(err){
        res.json({"message":err.message})
    }
    
    

}

module.exports = {registerNewEvent,getAllUserAndPublicEvents,getAnEvent,joinAnEvent,getAllEventDetails,sendMessage}
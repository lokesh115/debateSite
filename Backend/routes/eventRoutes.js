const express = require("express")
const {registerNewEvent,getAllUserAndPublicEvents,getAnEvent,joinAnEvent,getAllEventDetails,sendMessage} = require("../services/eventServices")

const eventRouter = express.Router()

eventRouter.post('/registerNewEvent',registerNewEvent)
eventRouter.get('/getAllUserAndPublicEvents',getAllUserAndPublicEvents)
eventRouter.get('/getAnEvent',getAnEvent)
eventRouter.post('/joinAnEvent',joinAnEvent)
eventRouter.get('/getAllEventDetails',getAllEventDetails)
eventRouter.post('/sendMessage',sendMessage)

module.exports = eventRouter;
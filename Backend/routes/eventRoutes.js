const express = require("express")
const {registerNewEvent,getAllEvents,getAnEvent} = require("../services/eventServices")

const eventRouter = express.Router()

eventRouter.post('/registerNewEvent',registerNewEvent)
eventRouter.get('/getAllEvents',getAllEvents)
eventRouter.get('/getAnEvent',getAnEvent)

module.exports = eventRouter;
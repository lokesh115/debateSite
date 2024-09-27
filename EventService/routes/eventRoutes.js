const express = require("express")
const {createNewEvent,fetchAllEvents,fetchAnEvent} = require("../services/eventServices")

const eventRouter = express.Router()

eventRouter.post('/registerUser',createNewEvent)
eventRouter.get('/getUsers',fetchAllEvents)
eventRouter.get('/loginUser',fetchAnEvent)

module.exports = eventRouter;
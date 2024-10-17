const express = require("express");
const http = require('http');
const bodyparser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors")
const db_config = require("./config/database_config")

const { Server } = require('socket.io');
const socketHandler = require('./socket/socketSerivce');

const userRouter = require("./routes/userRoutes")
const eventRouter = require("./routes/eventRoutes")

db_config()

const app = express();
const server = http.createServer(app);
// Configure CORS for Socket.IO
const io = new Server(server, {
    path: '/socket.io/',
    cors: {
      origin: '*', // Allow your frontend origin
      methods: ['GET', 'POST']
    }
  });
socketHandler(io);

app.use(cors())
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use("/user",userRouter)
app.use("/event",eventRouter)

const PORT = process.env.PORT;
server.listen(PORT,()=>{
    console.log("Backend Service @",PORT)
})
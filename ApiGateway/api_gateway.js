var proxy = require('express-http-proxy');
var app = require('express')();

//Frontend
const uiServiceURI = "http://frontend:1090"
app.use('/uiService', proxy(uiServiceURI))

//userService
const userServiceURI = "http://userservice:8081"
app.use('/userService', proxy(userServiceURI))

//eventService
const eventServiceURI = "http://eventservice:8082"
app.use('/eventService', proxy(eventServiceURI))

const PORT = 7878
app.listen(PORT,()=>{
    console.log("API Gateway Listening")
})
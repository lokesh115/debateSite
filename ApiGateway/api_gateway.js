var proxy = require('express-http-proxy');
var app = require('express')();

//Frontend
const uiServiceURI = "localhost:1090"
app.use('/uiService', proxy(uiServiceURI))

//userService
const userServiceURI = "localhost:8081"
app.use('/userService', proxy(userServiceURI))

const PORT = 7878
app.listen(PORT,()=>{
    console.log("API Gateway Listening")
})
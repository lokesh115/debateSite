var proxy = require('express-http-proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');

var app = require('express')();

//Frontend
const uiServiceURI = "http://localhost:1090"
app.use('/uiService', proxy(uiServiceURI))

//userService
const userServiceURI = 'http://localhost:8081';
app.use('/backend', createProxyMiddleware({
    target: userServiceURI,
    changeOrigin: true,
    ws: true, // Enable WebSocket proxying
}));



const PORT = 7878
app.listen(PORT,()=>{
    console.log("API Gateway Listening")
})
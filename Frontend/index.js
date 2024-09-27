const express = require("express");

const app = express();

app.get('/login',(req,res)=>{
    res.sendFile("LoginPage.html",{root:"LoginPage"}) 
})

app.get('/signup',(req,res)=>{
    res.sendFile("SignUp.html",{root:"LoginPage"}) 
})

app.get('/homePage',(req,res)=>{
    res.sendFile("HomePage.html",{root:"LoginPage"}) 
})

const PORT = 1090;
app.listen(PORT,()=>{
    console.log("Frontend")
})
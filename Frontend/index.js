const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const app = express();

app.use(express.static(path.join(__dirname,"LoginPage")));
app.use(express.static(path.join(__dirname,"EventCreation")));
app.use(express.static(path.join(__dirname,"EventChat")));

app.get('/api/config', (req, res) => {
    res.json({ apiUri: process.env.API_URI });
  });

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,"LoginPage","LoginPage.html"))
}) 

app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,"LoginPage","SignUp.html"))
})

app.get('/homePage',(req,res)=>{
    res.sendFile(path.join(__dirname,"EventCreation","HomePage.html")) 
})

app.get('/createEvent',(req,res)=>{
    res.sendFile(path.join(__dirname,"EventCreation","create_event.html")) 
})

app.get('/eventChat',(req,res)=>{
    res.sendFile(path.join(__dirname,"EventChat","EventChat.html")) 
})

const PORT = process.env.PORT || 1090;
app.listen(PORT,()=>{
    console.log("Frontend");
})
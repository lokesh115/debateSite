const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname,"LoginPage")));
app.use(express.static(path.join(__dirname,"EventCreation")));

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,"LoginPage","LoginPage.html"))
}) 

app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,"LoginPage","SignUp.html"))
})

app.get('/homePage',(req,res)=>{
    res.sendFile(path.join(__dirname,"EventCreation","HomePage.html")) 
})

const PORT = 1090;
app.listen(PORT,()=>{
    console.log("Frontend");
})
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors")
const db_config = require("./config/database_config")
const userRouter = require("./routes/userRoutes")

db_config()
const app = express();

app.use(cors())
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use("/",userRouter)

const PORT = 8081;
app.listen(PORT,()=>{
    console.log("User Service")
})
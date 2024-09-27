const express = require("express");
const bodyparser = require("body-parser");
const db_config = require("./config/database_config")
const eventRouter = require("./routes/eventRoutes")

db_config()
const app = express();

app.use(bodyparser.json())
app.use("/",eventRouter)

const PORT = 8082;
app.listen(PORT,()=>{
    console.log("User Service")
})
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors")
const db_config = require("./config/database_config")
const eventRouter = require("./routes/eventRoutes")

db_config()
const app = express();

app.use(cors())
app.use(bodyparser.json())
app.use("/",eventRouter)

const PORT = 8082;
app.listen(PORT,()=>{
    console.log("Event Service")
})
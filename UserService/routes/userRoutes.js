const express = require("express")
const {registerNewUser,getUsersData,loginNewUser} = require("../services/userServices")

const userRouter = express.Router()

userRouter.post('/registerUser',registerNewUser)
userRouter.get('/getUsers',getUsersData)
userRouter.post('/loginUser',loginNewUser)

module.exports = userRouter;
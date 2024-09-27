const {createNewUser,fetchAllUsers,fetchAUser} = require("../controllers/eventController")

async function registerNewUser(req,res){
    const isUserPresent = await fetchAUser(req.body) == null ? false : true
    if(!isUserPresent){
        const userData = await createNewUser(req.body)
        console.log("New user created : "+userData.uname)
        res.json(userData)
    }
    else{
        console.log("User already present : "+req.body.uname)
        res.json({"msg": "User already present"})
    }
    
}

async function getUsersData(req,res){
    const usersData = await fetchAllUsers()
    res.send(usersData)
}

async function loginNewUser(req,res){
    const usersData = await fetchAUser(req.body)
    if(usersData.password == req.body.password){
        res.json({"msg": "Login Successful"})
    }
    else{
        res.json({"msg": "Invalid Password"})
    }
}

module.exports = {registerNewUser,getUsersData,loginNewUser}
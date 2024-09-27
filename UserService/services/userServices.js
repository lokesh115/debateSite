const {createNewUser,fetchAllUsers,fetchAUser} = require("../controllers/userController")

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
    console.log(usersData)
    if(usersData==null){
        res.status(404)
        res.json({"message": "User doesn't exist"})
    }
    else if(usersData.password == req.body.password){
        res.json({"message": "Login Successful"})
    }
    else{
        res.status(404)
        res.json({"message": "Invalid Password"})
    }
}

module.exports = {registerNewUser,getUsersData,loginNewUser}
const UserModel = require("../models/UserModel");

function createNewUser(userData){
    const newUser = new UserModel({"uname":userData.uname,"email":userData.email,"password":userData.password,"gender":userData.gender,"age":userData.age});
    newUser.save();
    return newUser;
}

async function fetchAllUsers(){
    const allUsers = await UserModel.find();
    return allUsers;
}

async function fetchAUser(userData){
    const allUsers = await UserModel.findOne({"uname":userData.uname});
    return allUsers;
}

module.exports = {createNewUser,fetchAllUsers,fetchAUser};
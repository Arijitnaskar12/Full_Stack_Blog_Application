const { TRUE, ERROR } = require('../constants');
const User=require('../models/User');
const checkUsernameandEmail=async(Email,Username)=>{
    let UserData={
        data:null,
        err:null
    }
    try{
        // DB call 
        // or will check whether email or username present or not
         UserData.data=await User.find({$or :[{Email},{Username}]})
        return UserData;
    }catch(error)
    {
        UserData.err= error;
        return UserData;
    }
}
const addToDB=async(userObj)=>{
    try{
        await userObj.save();
        return TRUE;
    }catch(e){
    return ERROR;
    }
}
const getUserDataFromUsername=async(Username)=>{
    let UserData={
        data:null,
        err:null
    }
    try{
        UserData.data=await User.findOne({Username:Username});
        return UserData;
    }catch(e){
        UserData.err=e;
        return UserData;
    }
}

const getUserDataFromEmail=async(Email)=>{
    let UserData={
        data:null,
        err:null
    }
    try{
        UserData.data=await User.findOne({Email:Email});
        return UserData;
    }catch(e){
        UserData.err=e;
    return UserData;
    }
}
const getAlltheUserFromDB=async(Username)=>{
    const allUserdata={
        data:null,
        err:null
    }
    try{
        allUserdata.data=await User.find({Username:{$ne: Username}});
        return allUserdata;
    }catch(e){
        allUserdata.err=e;
        return allUserdata;
    }
}
module.exports={checkUsernameandEmail,addToDB,getUserDataFromEmail,getUserDataFromUsername,getAlltheUserFromDB};
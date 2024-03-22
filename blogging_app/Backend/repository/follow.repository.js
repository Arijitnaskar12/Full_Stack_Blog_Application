const { ERROR, TRUE } = require('../constants');
const Follow=require('../models/Follow');
const User = require('../models/User');
const getFollowData=async(followingUsername,followerUsername)=>{
const followData={
    data:null,
    err:null
}
try{
    followData.data=await Follow.findOne({followingUsername,followerUsername});
    return followData;
}catch(e){
     followData.err=e;
     return followData;
}
}
const addFollowDB=async(followObj)=>{
 try{
    await followObj.save();

 }catch(e){
    return ERROR;
 }
}
const deleteFollowDB=async(followingUsername,followerUsername)=>{
    try{
        await Follow.findOneAndDelete({followingUsername:followingUsername,followerUsername:followerUsername})
        return TRUE;
    }catch(e){

        return ERROR;
    }
}
const getFollowingListFromDB=async(followerUsername)=>{
    const followingList={
        data:null,
        err:null
    }
try{
    followingList.data=await Follow.find({followerUsername:followerUsername});
    return followingList;
}catch(e){
    followingList.err=e;
    return followingList;
}
}
const getFollowingDetailsFromDB=async(followingUsername)=>{
    const followingDetails={
        data:null,
        err:null
    }
try{
    followingDetails.data=await User.find({Username:{ $in: followingUsername}});
    return followingDetails;
}catch(e){
    followingDetails.err=e;
    return followingDetails;
}
}
const getFollowerListFromDB=async(followingUsername)=>{
    const followerList={
        data:null,
        err:null
    }
try{
    followerList.data=await Follow.find({followingUsername:followingUsername});
    return followerList;
}catch(e){
    followerList.err=e;
    return followerList;
}
}
const getFollowerDetailsFromDB=async(followerUsername)=>{
    const followerDetails={
        data:null,
        err:null
    }
try{
    followerDetails.data=await User.find({Username:{ $in: followerUsername}});
    return followerDetails;
}catch(e){
    followerDetails.err=e;
    return followerDetails;
}
}
module.exports={getFollowData,addFollowDB,deleteFollowDB,getFollowingListFromDB,getFollowingDetailsFromDB,getFollowerListFromDB,getFollowerDetailsFromDB};
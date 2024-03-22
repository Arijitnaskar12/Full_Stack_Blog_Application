const { ERROR, FALSE, TRUE } = require("../constants");
const Follow = require("../models/Follow");
const { addFollowDB, deleteFollowDB, getFollowingListFromDB, getFollowingDetailsFromDB, getFollowerListFromDB, getFollowerDetailsFromDB } = require("../repository/follow.repository");
const { checkIfUserFollows } = require("../utils/checkIfUserFollows");
const { validateUsername } = require("../utils/validateUsername");
const joi=require('joi');
const followUser=async(req,res)=>{
     const followerUsername=req.locals.Username;
     const {followingUsername}=req.body;
     const isValid=joi.object({
        followingUsername:joi.string().required(),
     }).validate(req.body);

     if(isValid.error){
        return res.status(400).send({
            status:400,
            message:"Invalid Username id",
            data:isValid.error
        })
     }
     // validate followingUsername
const isUser=await validateUsername(followingUsername);
if(isUser==ERROR){
    return res.status(400).send({
        status:400,
        message: "DB Error- getUserDataFromUsername failed"
    })
}else if(isUser==FALSE)
{
    return res.status(400).send({
        status:400,
        message: "Following user Does not exist"
    })
}
    //  validate followerUsername
    const isUser1=await validateUsername(followerUsername);
    if(isUser1==ERROR){
        return res.status(400).send({
            status:400,
            message: "DB Error- getUserDataFromUsername failed"
        })
    }else if(isUser1==FALSE)
    {
        return res.status(400).send({
            status:400,
            message: "Following user Does not exist"
        })
    }


    // check followerUsername is already follows  the followingUsername 
    const alreadyFollows=await checkIfUserFollows(followingUsername,followerUsername);
    if(alreadyFollows==ERROR){
        return res.status(400).send({
            status:400,
            message:"DB ERROR--> getFollowData ERROR"
        })
    }else if(alreadyFollows==TRUE){
        return res.status(400).send({
            status:400,
            message:"You already follow this user"
        })
    }
    const followObj= new Follow({
        followerUsername,
        followingUsername,
    })
    const response=await addFollowDB(followObj);
    if(response==ERROR){
        return res.status(400).send({
            status:400,
            message:"DB ERROR--> addFollowDB failed"
        })
    }
    res.status(201).send({
        status:201,
        message:"Followed Successfully!"
    })
}
const unFollowUser=async(req,res)=>{
    const followerUsername=req.locals.Username;
    const {followingUsername}=req.body;
    const isValid=joi.object({
       followingUsername:joi.string().required(),
    }).validate(req.body);

    if(isValid.error){
       return res.status(400).send({
           status:400,
           message:"Invalid Username id",
           data:isValid.error
       })
    }
    // validate followingUsername
const isUser=await validateUsername(followingUsername);
if(isUser==ERROR){
   return res.status(400).send({
       status:400,
       message: "DB Error- getUserDataFromUsername failed"
   })
}else if(isUser==FALSE)
{
   return res.status(400).send({
       status:400,
       message: "Following user Does not exist"
   })
}
   //  validate followerUsername
   const isUser1=await validateUsername(followerUsername);
   if(isUser1==ERROR){
       return res.status(400).send({
           status:400,
           message: "DB Error- getUserDataFromUsername failed"
       })
   }else if(isUser1==FALSE)
   {
       return res.status(400).send({
           status:400,
           message: "Following user Does not exist"
       })
   }


   // check followerUsername is already follows  the followingUsername 
   const alreadyFollows=await checkIfUserFollows(followingUsername,followerUsername);
   if(alreadyFollows==ERROR){
       return res.status(400).send({
           status:400,
           message:"DB ERROR--> getFollowData ERROR"
       })
   }else if(alreadyFollows==FALSE){
       return res.status(400).send({
           status:400,
           message:"You don't Follow this User"
       })
   }
   const response=await deleteFollowDB(followingUsername,followerUsername);
     if(response==ERROR){
       return res.status(400).send({
           status:400,
           message:"DB ERROR--> deleteFollowDB failed"
       })
   }
   return res.status(201).send({
       status:201,
       message:"Unfollowed Successfully!"
   })
}
const getFollowingList=async(req,res)=>{
const Username=req.locals.Username;
// validate username
const isUser=await validateUsername(Username);
if(isUser==ERROR){
    return res.status(400).send({
        status:400,
        message: "DB Error- getUserDataFromUsername failed"
    })
}else if(isUser==FALSE)
{
    return res.status(400).send({
        status:400,
        message: "Following user Does not exist"
    })
}
const followingList=await getFollowingListFromDB(Username);
if(followingList.err){
    return res.status(400).send({
        status:400,
        message:"DB Error-->getFollowingListFromDB failed"
    })
}
let followingUsername=[];
followingList.data.forEach((followObj)=>{
followingUsername.push(followObj.followingUsername);
})
const FollowingDetails=await getFollowingDetailsFromDB(followingUsername);
if(FollowingDetails.err){
    return res.status(400).send({
        status:400,
        message:"DB Error-->getFollowingDetailsFromDB failed"
    })
}
let usersData=[];
FollowingDetails.data.map((user)=>{
let userData={
    Name:user.Name,
    Email:user.Email,
    Username:user.Username,
    _id:user._id
}
usersData.push(userData);
})
return res.status(200).send({
    status:200,
    message:"Fetched Following List",
    data:usersData
})
}
const getFollowerList=async (req,res)=>{
    const Username=req.locals.Username;
// validate username
const isUser=await validateUsername(Username);
if(isUser==ERROR){
    return res.status(400).send({
        status:400,
        message: "DB Error- getUserDataFromUsername failed"
    })
}else if(isUser==FALSE)
{
    return res.status(400).send({
        status:400,
        message: "Following user Does not exist"
    })
}
const followerList=await getFollowerListFromDB(Username);
if(followerList.err){
    return res.status(400).send({
        status:400,
        message:"DB Error-->getFollowerListFromDB failed"
    })
}
let followerUsername=[];
followerList.data.forEach((followObj)=>{
followerUsername.push(followObj.followerUsername);
})

const FollowerDetails=await getFollowerDetailsFromDB(followerUsername);
if(FollowerDetails.err){
    return res.status(400).send({
        status:400,
        message:"DB Error-->getFollowerDetailsFromDB failed"
    })
}
let usersData=[];
FollowerDetails.data.map((user)=>{
let userData={
    Name:user.Name,
    Email:user.Email,
    Username:user.Username,
    _id:user._id
}
usersData.push(userData);
})
return res.status(200).send({
    status:200,
    message:"Fetched Follower List",
    data:usersData
})
}
module.exports={followUser,unFollowUser,getFollowingList,getFollowerList};
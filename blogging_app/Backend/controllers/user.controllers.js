// importing "joi" which is used for validation of input
const joi=require('joi');
// bcrypt is used for password encryption
const bcrypt=require('bcrypt');
require('dotenv').config();
const jwt=require('jsonwebtoken');
const { verifyEmailandUsername } = require('../utils/verifyEmailandUsername');
const { FALSE, TRUE, ERROR } = require('../constants');
const User = require('../models/User');
const { addToDB, getUserDataFromEmail, getUserDataFromUsername, getAlltheUserFromDB } = require('../repository/user.repository');
const BCRYPT_SALTS=Number(process.env.BCRYPT_SALTS);
// POST-Register an user
const registerUser=async(req,res)=>{
    // For validation we have to make joi object,in that object we have main our userSchema
    // .string() used for it have to be string
    // .required() is mandatory or not
    // .min() and .max() length validation .alphanum()  is for only alphabets and numbers are allowed
 const isValid=joi.object().keys({
    Name:joi.string().required(),
    Username:joi.string().min(3).max(30).alphanum().required(),
    Email:joi.string().email().required(),
    Password:joi.string().min(8).required(),
 }).validate(req.body);
 if(isValid.error)
 { 
   return res.status(400).send({
        status:400,
        message:"Invalid Input",
        data:isValid.error,
    })
 }
//  checking whether any exitting email or username is already present or not
 const isUserExisting=await verifyEmailandUsername(req.body.Email,req.body.Username);
 if(isUserExisting===TRUE)
 {
    return res.status(400).send({
        status:400,
        message:"Email or Username is already exists."
    });
 }else if(isUserExisting === ERROR)
 {
    return res.status(400).send({
        status:400,
        message:"Err: verifyEmailandUsername failed!"
    });  
 }
 const hashedPassword=await bcrypt.hash(req.body.Password,BCRYPT_SALTS);
const userObj=new User({
   Name:req.body.Name,
   Username:req.body.Username,
   Email:req.body.Email,
   Password:hashedPassword
});
const response= await addToDB(userObj);
if(response===ERROR)
{
  return  res.status(400).send({
      status:400,
      message:"DB err:Failed to add new User!"
   })
}else if(response===TRUE){

return res.status(201).send({
   status:201,
   message:"User added successfully!"
})
}
}
// POST-Login User
 const loginUser=async(req,res)=>{
   const {Email:loginId,Password}=req.body;
   const isValid=joi.object({
      loginId:joi.string().email().required()
   }).validate({loginId});
   let userData;
   if(isValid.error)
   {
      userData=await getUserDataFromUsername(loginId);
      if(userData.err)
      {
         return res.status(400).send({
            status:400,
            message:"DB Error: getUserDataFromUsername failed!"
         })
      }
   }else{
      userData=await getUserDataFromEmail(loginId);
      if(userData.err)
      {
        return  res.status(400).send({
            status:400,
            message:"DB Error: getUserDataFromEmail failed!"
         })
      }
   }
   if(!userData.data){
      return res.status(400).send({
         status:400,
         message:"User not found!Please register"
      })
   }
   const isPasswordMatching=await bcrypt.compare(Password,userData.data.Password);
   if(!isPasswordMatching)
   {
       return res.status(400).send({
         status:400,
         message:"Password not matched.Please enter the correct password!"
      })
   }
   const payload={
      Username:userData.data.Username
   }
   const token=await jwt.sign(payload,process.env.JWT_SECRET_KEY)
  return res.status(200).send({
      status:200,
      message:"Logged in SuccessFully",
      data:{
         token,
      }
   })
 }
 const getallUsers=async(req,res)=>{
   const Username=req.locals.Username;
   const allUsersdata=await getAlltheUserFromDB(Username);
   if(allUsersdata.err)
   {
      return res.status(400).send({
         status:400,
         message:"DB Failed--> getAlltheUserFromDB failed"
      })
   }
   let usersdata=[];
   allUsersdata.data.map((user)=>{
      const userObj={
         Name:user.Name,
         Email:user.Email,
         Username:user.Username,
         _id:user._id
      }
      usersdata.push(userObj);
   })
   return res.status(200).send({
      status:200,
      message:"All users fetched!",
      data:usersdata
   })
 }
module.exports={registerUser,loginUser,getallUsers};
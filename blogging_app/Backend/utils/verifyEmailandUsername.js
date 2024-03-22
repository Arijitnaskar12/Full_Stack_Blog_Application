const { TRUE, FALSE, ERROR } = require("../constants");
const { checkUsernameandEmail } = require("../repository/user.repository")

const verifyEmailandUsername=async(Email,Username)=>{
 const UserData=await checkUsernameandEmail(Email,Username);
 if(UserData.data.length!=0)
 {
    return TRUE;
 }else if(UserData.err){
    return ERROR;
 }else{
    return FALSE;
 }
}
module.exports={verifyEmailandUsername};
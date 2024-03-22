const { TRUE, ERROR, FALSE } = require("../constants");
const { getUserDataFromUsername } = require("../repository/user.repository");

const validateUsername=async(Username)=>{
    const userData=await getUserDataFromUsername(Username);

    if(userData.err){
        return ERROR;
    }else if(userData.data!==null)
    {
        return TRUE;
    }else{
        return FALSE;
    }
}
module.exports={validateUsername};
const { FALSE, TRUE, ERROR } = require("../constants");
const { getFollowData } = require("../repository/follow.repository");

const checkIfUserFollows=async(followingUsername,followerUsername)=>{
    const followData=await getFollowData(followingUsername,followerUsername);

    if(followData.err){
        return ERROR;
    }else if(followData.data!=null)
    {
        return TRUE;
    }else{
        return FALSE;
    }
}
module.exports={checkIfUserFollows};
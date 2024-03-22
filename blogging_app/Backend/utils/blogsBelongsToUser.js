const { TRUE, ERROR, FALSE, NOT_EXIST } = require("../constants");
const { getBlogDataFromDB } = require("../repository/blog.repository");

const blogsBelongsToUser=async(blogid,username)=>{
    
    const blogData=await getBlogDataFromDB(blogid);
    if(blogData.data==null & blogData.error==null){
        return NOT_EXIST;
    }
    if(blogData.error){
        return ERROR;
    }else if(blogData.data.username===username)
    {
        return TRUE;
    }else{
        return FALSE;
    }
}
module.exports={blogsBelongsToUser};
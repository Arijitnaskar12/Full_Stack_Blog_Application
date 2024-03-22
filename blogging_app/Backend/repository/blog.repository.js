const { TRUE, ERROR } = require("../constants");
const Blog = require("../models/Blog");

const addBlogDB=async(blogObj)=>{

    try{

        await blogObj.save();
        return TRUE;
    }catch(e){
        return ERROR;
    }
}
const getUserBlogsFromDb=async(username,page,LIMIT)=>{
    let BlogsData={
        data:null,
        error:null
    }
    try{
        BlogsData.data=await Blog.find({username,isDeleted:false}).sort({creationDateTime:-1}).skip((page-1)*LIMIT).limit(LIMIT);
        return BlogsData;
    }catch(e){
        BlogsData.error=e
        return BlogsData;
    }
}
const getBlogDataFromDB=async(blogid)=>{
        let blogData={
            data:null,
            error:null
        }
        try{
            blogData.data=await Blog.findOne({_id:blogid});
            return blogData;
        }catch(e){
            blogData.error=e;
            return blogData;
        }
}
const deleteBlogFromDB=async(blogid)=>{
    try{
        await Blog.findByIdAndUpdate(blogid,{isDeleted:true,deletionDateTime:Date.now()});
        return TRUE;

    }catch(e){
        return ERROR;
    }
}
const updateBlogInDB=async(blogId,newBlogObject)=>{
    try{
        await Blog.findByIdAndUpdate({_id:blogId},newBlogObject);
        return TRUE;
    }catch(e){
        return ERROR;
    }
}
const getFollowingBlogFromDB=async(followingUsername)=>{
    const followingUsersData={
        data:null,
        err:null
    }
    try{
        followingUsersData.data=await Blog.find({username: {$in:followingUsername},isDeleted:false});
        return followingUsersData;
    }catch(e){
       followingUsersData.err=e;
       return followingUsersData;
    }
}
module.exports={addBlogDB,getUserBlogsFromDb,getBlogDataFromDB,deleteBlogFromDB,updateBlogInDB,getFollowingBlogFromDB};
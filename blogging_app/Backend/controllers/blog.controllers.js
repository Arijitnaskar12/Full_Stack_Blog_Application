const joi=require('joi');
const Blog = require('../models/Blog');
const { addBlogDB, getUserBlogsFromDb, deleteBlogFromDB, getBlogDataFromDB, updateBlogInDB, getFollowingBlogFromDB } = require('../repository/blog.repository');
const { ERROR, FALSE, NOT_EXIST } = require('../constants');
const { blogsBelongsToUser } = require('../utils/blogsBelongsToUser');
const { getFollowingListFromDB } = require('../repository/follow.repository');
// creating a blog
const createBlog=async(req,res)=>{
    // console.log(req.locals.Username);
    const isValid=joi.object({
        title:joi.string().required(),
        textBody:joi.string().min(30).max(1000).required()
    }).validate(req.body);
    if(isValid.error){
       return res.status(400).send({
            status:400,
            message:"Invaild data format!",
            data:isValid.error
        })
    }
    const{title,textBody}=req.body;
    const blogObj=new Blog({
        title,
        textBody,
        creationDateTime:Date.now(),
        username:req.locals.Username
    });
    const response=await addBlogDB(blogObj);
    if(response===ERROR)
    {
        return res.status(400).send({
            status:400,
            message:"DB Error- addBlogDB Failed!"
        })
    }
   return res.status(201).send({
        status:201,
        message:"Blog Created Successfully"
    })
}
// retriving all blogs of a particular user
const getUserBlogs=async(req,res)=>{
    const UserName=req.locals.Username;
    const page=req.query.page||1;
    const LIMIT=10;
    const blogsData= await getUserBlogsFromDb(UserName,page,LIMIT);
    if(blogsData.err)
      {
         res.status(400).send({
            status:400,
            message:"DB Error: getUserBlogsFromDb failed!"
         })
      }
      res.status(200).send({
        status:200,
        message:"Fetched user blog Successfully!",
        data:blogsData.data
      })
};
// DELETE-delete a blog for a particular user
const deleteUserBlog=async(req,res)=>{
 const blogid=req.params.blogid;
 const username=req.locals.Username;
 const blogBelongstoUserStatus=await blogsBelongsToUser(blogid,username);
 if(blogBelongstoUserStatus===NOT_EXIST)
 {
   return res.status(400).send({
       status:400,
       message:"Blog Doesn't Exist"
   })
 }else if(blogBelongstoUserStatus==ERROR)
 {
  return res.status(400).send({
        status:400,
        message:"DB Error: getBlogDataFromDB failed "
    })
 }else if(blogBelongstoUserStatus==FALSE)
 {
    return res.status(403).send({
        status:403,
        message:"Unauthorized to delete the blog.you are not the owner of the blog!"
    })
 }
 const response=await deleteBlogFromDB(blogid);
 if(response===ERROR){
    return res.status(400).send({
        status:400,
        message:"DB ERROR: deleteBlogFromDB failed"
    })
 }else{
    return res.status(200).send({
        status:200,
        message:"Blog Deleted Successfully"
    })
}
}
// update a blog
const editBlog=async(req,res)=>{
const{blogid,title,textBody}=req.body;
const username=req.locals.Username;
const blogBelongstoUserStatus=await blogsBelongsToUser(blogid,username);
if(blogBelongstoUserStatus==NOT_EXIST)
{
  return res.status(400).send({
      status:400,
      message:"Blog Doesn't Exist"
  })
}else if(blogBelongstoUserStatus==ERROR)
{
 return res.status(400).send({
       status:400,
       message:"DB Error: getBlogDataFromDB failed "
   })
}else if(blogBelongstoUserStatus==FALSE)
{
   return res.status(403).send({
       status:403,
       message:"Unauthorized to Edit the blog.you are not the owner of the blog!"
   })
}
const blogData=await getBlogDataFromDB(blogid);
if(blogData.err)
{
   res.status(400).send({
      status:400,
      message:"DB Error: getUserBlogsFromDb failed!"
   })
}

const creationDateTime=blogData.data.creationDateTime;
const currentTime=Date.now();
const diff=(currentTime-creationDateTime)/(1000*60);
if(diff>30){
    return res.status(400).send({
        status:400,
        message:"Not allowed to edit  after 30 minutes of creation"
    })
}
const newBlogObject={
    title,
    textBody
}
const response=await updateBlogInDB(blogid,newBlogObject);
if(response==ERROR)
{
    return res.status(400).send({
        status:400,
        message:"DB ERROR: updateBlogInDB failed"
    })
}
return res.status(200).send({
    status:200,
    message:"Blog updated successfully!"
})
}

const getHomePageBlogs=async(req,res)=>{
    const Username=req.locals.Username;
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
const followingBlogs=await getFollowingBlogFromDB(followingUsername);
if(followingBlogs.err){
    return res.status(400).send({
        status:400,
        message:"DB failed-->  getFollowingBlogFromDB failed",
    })
}
return res.status(200).send({
    status:200,
    message:"Fethed Homeblogs Successfully",
    data:followingBlogs.data
})

}
module.exports={createBlog,getUserBlogs,deleteUserBlog,editBlog,getHomePageBlogs};
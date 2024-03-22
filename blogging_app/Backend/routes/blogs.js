const express=require('express');
const { createBlog, getUserBlogs, deleteUserBlog, editBlog, getHomePageBlogs } = require('../controllers/blog.controllers');
const { isAuth } = require('../middleware/isAuth');
const app=express();

// creating user
app.post("/create-blog",isAuth,createBlog);
app.get("/get-user-blogs",isAuth,getUserBlogs);
app.delete("/delete-blog/:blogid",isAuth,deleteUserBlog);
app.put("/edit-blog",isAuth,editBlog);
app.get("/homepage-blogs",isAuth,getHomePageBlogs);
// exporting app because we have to import in main file(index.js)
module.exports=app;
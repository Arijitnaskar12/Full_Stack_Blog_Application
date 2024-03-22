const express=require('express');
const { isAuth } = require('../middleware/isAuth');
const { followUser, unFollowUser, getFollowingList, getFollowerList } = require('../controllers/follow.controller');
const app=express();

// creating user
app.post("/follow-user",isAuth,followUser);
app.post("/Unfollow-user",isAuth,unFollowUser);
app.get("/following-list",isAuth,getFollowingList);
app.get("/follower-list",isAuth,getFollowerList);
// exporting app because we have to import in main file(index.js)
module.exports=app;
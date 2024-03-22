const express=require('express');
const { registerUser, loginUser, getallUsers } = require('../controllers/user.controllers');
const { isAuth } = require('../middleware/isAuth');
const app=express();

// creating user
app.post("/register",registerUser);
app.post('/login',loginUser);
app.get('/get-all-users',isAuth,getallUsers);
// exporting app because we have to import in main file(index.js)
module.exports=app;
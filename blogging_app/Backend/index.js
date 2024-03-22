const express=require('express');
const app=express();
require('dotenv').config();
const cors=require('cors');
// middlewares
app.use(express.json());
app.use(cors({
    origin:'*',
}))
// file imports
const db=require('./config/db');
const UserRoutes=require('./routes/user');
const BlogRoutes=require('./routes/blogs');
const FollowRoutes=require('./routes/follow');
const { cleanupBin } = require('./utils/cron');

// PORT
const PORT=process.env.PORT||3000;
// Routes
app.use('/user',UserRoutes); 
app.use('/blog',BlogRoutes); 

app.use('/follow',FollowRoutes); 

// Listening to the port
app.listen(PORT,()=>{
    console.log(`Server is running on port:`,PORT);
    cleanupBin();
})
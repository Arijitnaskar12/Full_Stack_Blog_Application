const cron=require('node-cron');
const Blog = require('../models/Blog');
const cleanupBin=()=>{
    cron.schedule("0 0 1 * * *",async()=>{
        console.log("cron ins running");
        const deletedBlogs=await Blog.find({isDeleted:true});
        if(deletedBlogs.length>0){
            deletedBlogs.forEach(async(blog)=>{
                const diff=(Date.now()-blog.deletionDateTime.getTime())/(1000*60*60*24);
                if(diff>30){
                    try{
                        await Blog.findOneAndDelete({username:blog.username});
                    }catch(e){
                        console.log(e);
                    }
                }
            });
        }
    },
    {
        scheduled:true,
        timezone:'Asia/kolkata',
    }
    )
}
module.exports={cleanupBin};
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const FollowSchema=new Schema({
    followerUsername:{
        // with the help of ref we can access users schema(foreign key)
        type:String,
        ref:"users",
        require:true
    },
    followingUsername:{
        type:String,
        ref:"users",
        reqiure:true
    },
    creationDateTime:{
        type:Date,
        default:Date.now(),
        require:true
    }
})
module.exports=mongoose.model('follow',FollowSchema);
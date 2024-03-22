// for making schema below two is important
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// making userSchema with the help of Schema Object

const UserSchema=new Schema({
    Name:{
        type:String,
        require:true
    },
    Username:{
        type:String,
        require:true,
        unique:true
    },
    Email:{
    type:String,
    require:true,
    unique:true
     },
    Password:{
    type:String,
    require:true
    }
});
// exporting the schema with help of mongoose
 module.exports=mongoose.model("users",UserSchema);
import mongoose, { mongo } from "mongoose";

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    mobile:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","owner","ddeliveryBoy"],
        required:true
    }
    
},{timestamps:true})

const User=mongoose.model("User",userSchema)
export default User
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generatetoken from "../utils/token.js"


// 1)signup controller
// --here we write signup controller and after creating user we will send user id to token generator for website ,tokens are generated in util folder
// --after we will call generate token in controller and we will pass user id here
// --after creating token to dispaly in browser we will use cookies so we use cookies to display token 
export const signup=async (req,res) => {
    try {
        const {fullName,email,password,mobile,role}=req.body
        let user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exist"})
        }
        if(password.length<6){
            return res.status(400).json({
                message:"Password must be greater than 6 digits"
            })
        }
        if(mobile.length<10){
            return res.status(400).json({
                message:"Invalid Mobile Number"
            })
        }
        const hashedpassword=await bcrypt.hash(password,10);
        user=await User.create({
            fullName,
            email,
            password:hashedpassword,
            mobile,
            role
        })

        const token=await generatetoken(user._id);
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })

        return res.status(201).json({
            user,
            message:"Successfully user Created"
        })
    } catch (error) {
        return res.status(500).json(`signup error ${error}`)
    }
}

// sign in controller -- nothing change same as sign out 
export const signin=async (req,res) => {
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User Does not found"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Incorrect Password"})
        }
        const token=await generatetoken(user._id);
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })

        return res.status(200).json({
            user,
            message:"Successfully user Logined"
        })
    } catch (error) {
        return res.status(500).json(`signin error ${error}`)
    }
}

export const signout=async (req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"Log out successfully"})
    } catch (error) {
        return res.status(500).json(`signin error ${error}`)
    }
}
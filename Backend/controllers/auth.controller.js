import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generatetoken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";

// 1)signup controller
// --here we write signup controller and after creating user we will send user id to token generator for website ,tokens are generated in util folder
// --after we will call generate token in controller and we will pass user id here
// --after creating token to dispaly in browser we will use cookies so we use cookies to display token
export const signup = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be greater than 6 digits",
      });
    }
    if (mobile.length < 10) {
      return res.status(400).json({
        message: "Invalid Mobile Number",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      email,
      password: hashedpassword,
      mobile,
      role,
    });

    const token = await generatetoken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json({
      user,
      message: "Successfully user Created",
    });
  } catch (error) {
    return res.status(500).json(`signup error ${error}`);
  }
};

// sign in controller -- nothing change same as sign out
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Does not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    const token = await generatetoken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json({
      user,
      message: "Successfully user Logined",
    });
  } catch (error) {
    return res.status(500).json(`signin error ${error}`);
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Log out successfully" });
  } catch (error) {
    return res.status(500).json(`signin error ${error}`);
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User Doesnt exist",
      });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.isOtpVerified = false;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();
    await sendOtpMail(email, otp);
    return res.status(200).json({
      message: "Otp Sent Successfully",
      success:"true"
    });
  } catch (error) {
    return res.status(500).json({
      message:`sendOtp error ${error}`,
      success:"false"
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
      return res.status(400).json({
        message: "invalid / expired Otp",
      });
    }
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.status(200).json({
      message: "Otp Verifed Successfully",
      success:"true"
    });
  } catch (error) {
    return res.status(500).json({
      message:`VerifiedOtp error ${error}`,
      success:"false"
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newpassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({
        message: "otp verification required",
      });
    }
    const hashedpassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedpassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({
      message: "password reset successfully",
      success:"true"
    });
  } catch (error) {
    return res.status(500).json({
      message:`reset password error ${error}`,
      success:"false"
    });
  }
};


export const googleAuth=async(req,res)=>{
  try {
    const {fullName,email,mobile,role}=req.body
    let user=await User.findOne({email})
    if(!user){
      user=await User.create({
        fullName,email,mobile,role
      })
    }
    const token = await generatetoken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json({
      message:"User Created Successfully",
      success:"true"
    })
  } catch (error) { 
    console.log("error")
  }
}
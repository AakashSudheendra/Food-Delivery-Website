import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendOtpMail=async (to,otp)=>{
    await transporter.sendMail({
        from : process.env.EMAIL,
        to,
        subject:"Reset Your Password",
        html:`<p>Your Otp for password reset is <b>${otp}</b>. It Expires in Five Minutes. </p>`
    })
}
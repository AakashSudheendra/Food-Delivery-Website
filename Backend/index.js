import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
const app=express()
const port=process.env.PORT || 5000
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))//helps to talk with frontend and backend with different ports and credintials helps to allow sending cookies from frontend to backend 
app.use(express.json())//read json data from frontend
app.use(cookieParser())//it read cookies sent from browser
app.use("/api/auth",authRouter)

app.listen(port,()=>{
    connectDb()
    console.log(`Server is Running at ${port}`)
})
import express from "express"
import { signin, signout, signup } from "../controllers/auth.controller.js"
const authRouter=express.Router()

authRouter.post("/signup",signup)
authRouter.get("/signout",signout)
authRouter.post("/signin",signin)

export default authRouter
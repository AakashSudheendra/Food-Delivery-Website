import express from "express";
import {
  googleAuth,
  resetPassword,
  sendOtp,
  signin,
  signout,
  signup,
  verifyOtp,
} from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.get("/signout", signout);
authRouter.post("/signin", signin);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/google-auth", googleAuth);

export default authRouter;

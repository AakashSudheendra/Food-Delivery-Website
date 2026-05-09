import express from "express";
import { createAndEditShop, getMyShop } from "../controllers/shop.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";


//user routes
const shopRouter = express.Router();

shopRouter.post("/create-edit",isAuth,upload.single("image"), createAndEditShop);
shopRouter.get("/get-my",isAuth,getMyShop)


export default shopRouter;

import express from "express";
import { createAndEditShop } from "../controllers/shop.controller";
import isAuth from "../middlewares/isAuth";
import { upload } from "../middlewares/multer.js";


//user routes
const shopRouter = express.Router();

shopRouter.post("/create-edit",isAuth,upload.single("image"), createAndEditShop);



export default shopRouter;

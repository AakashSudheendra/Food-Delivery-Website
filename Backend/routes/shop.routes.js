import express from "express";
import { createAndEditShop } from "../controllers/shop.controller";
import isAuth from "../middlewares/isAuth";


//user routes
const shopRouter = express.Router();

shopRouter.get("/create-edit",isAuth, createAndEditShop);



export default shopRouter;

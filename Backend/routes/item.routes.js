import express from "express";
import { addItem, editItem } from "../controllers/item.controller.js";
import isAuth from "../middlewares/isAuth";
import { upload } from "../middlewares/multer.js";

//user routes
const itemRouter = express.Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), addItem);
itemRouter.post("/edit-item/:itemId", isAuth, upload.single("image"), editItem);

export default itemRouter;

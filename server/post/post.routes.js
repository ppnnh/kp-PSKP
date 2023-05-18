import express from "express"
import postController from "./post.controller.js"
import authMiddleware from "../middleware/authMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"
let router=express.Router()

router.get("/pizza", authMiddleware, adminMiddleware, postController.postPizza)
router.get("/drink", authMiddleware, adminMiddleware, postController.postDrink)
    
export default router

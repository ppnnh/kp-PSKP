import express from "express"
import putController from "./put.controller.js"
import authMiddleware from "../middleware/authMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"
let router=express.Router()

router.get("/pizza/:id", authMiddleware, adminMiddleware, putController.putPizza)
router.get("/drink/:id", authMiddleware, adminMiddleware, putController.putDrink)
    
export default router

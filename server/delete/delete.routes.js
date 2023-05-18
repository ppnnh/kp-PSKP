import express from "express"
import deleteController from "./delete.controller.js"
import authMiddleware from "../middleware/authMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"

let router=express.Router()

router.get("/pizza/:id", authMiddleware, adminMiddleware, deleteController.deletePizza)
router.get("/drink/:id", authMiddleware, adminMiddleware, deleteController.deleteDrink)
    
export default router

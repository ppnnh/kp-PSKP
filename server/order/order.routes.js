import express from "express"
import orderController from "./order.controller.js"
import authMiddleware from "../middleware/authMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"

let router=express.Router()

router.post("/", authMiddleware, orderController.addOrder)
router.get("/", authMiddleware, orderController.getOrders)
router.put('/:id', authMiddleware, orderController.completeOrder);

    
export default router

import express from "express"
import cartController from "./cart.controller.js"
import authMiddleware from "../middleware/authMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"

let router=express.Router()

router.get("/", authMiddleware, cartController.Cart)

export default router

import express from "express"
import constructorController from "./constructor.controller.js"
import authMiddleware from "../middleware/authMiddleware.js"

let router=express.Router()

router.get("/", authMiddleware, constructorController.getAll)

export default router 
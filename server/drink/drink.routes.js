import express from "express"
import drinkController from "./drink.controller.js"
import authMiddleware from "../middleware/authMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"
let router=express.Router()

router.get("/", authMiddleware, drinkController.getAll)
router.get("/:id", authMiddleware, drinkController.getUnique)
router.post("/", authMiddleware, adminMiddleware, drinkController.addDrink)
router.put("/:id",authMiddleware, adminMiddleware , drinkController.updateDrink)
router.delete("/:id", authMiddleware, adminMiddleware, drinkController.deleteDrink)

export default router 
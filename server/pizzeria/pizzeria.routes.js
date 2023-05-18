import express from "express"
import pizzeriaController from "./pizzeria.controller.js"
import authMiddleware from "../middleware/authMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"
let router=express.Router()

router.get("/", authMiddleware, pizzeriaController.getAll)
router.get("/:id", authMiddleware, pizzeriaController.getUnique)
router.put("/:id", authMiddleware, adminMiddleware, pizzeriaController.updatePizzeria)
router.get("/pizza/:id", authMiddleware, adminMiddleware, pizzeriaController.getPizzaToAdd)
router.post("/pizzeria", authMiddleware, adminMiddleware, pizzeriaController.addPizzeria)

export default router 
import express from "express"
import pizzaController from "./pizza.controller.js"
import adminMiddleware from "../middleware/adminMiddleware.js"
import authMiddleware from "../middleware/authMiddleware.js"

let router=express.Router()

router.get("/", authMiddleware, pizzaController.getAll)
router.get("/:id", authMiddleware, pizzaController.getUnique)
router.post("/", authMiddleware, adminMiddleware, pizzaController.addPizza)
router.put("/:id", authMiddleware, adminMiddleware, pizzaController.updatePizza)
router.delete("/:id", authMiddleware, adminMiddleware, pizzaController.deletePizza)

export default router 
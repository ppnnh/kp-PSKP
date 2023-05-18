import express from "express"
import jwtController from "./jwt.controller.js"
import authMiddleware from "../middleware/authMiddleware.js"

let router=express.Router()

router.get("/", jwtController.index)
router.get("/login", jwtController.loginPage)
router.get("/signup", jwtController.signUpPage)
router.post("/signup", jwtController.signup)
router.post("/login", jwtController.login)
router.get("/profile",authMiddleware ,jwtController.getOne)
router.get("/logout", authMiddleware, jwtController.logout)

export default router 
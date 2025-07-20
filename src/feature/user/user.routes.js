// Import required packages
import express from "express";
import UserController from "./user.controller.js";

// Initialize controller and router
const router = express.Router();
const userController = new UserController();

// Routes
// User registration
router.post("/signup", userController.signUp);   

// User login
router.post("/signin", userController.signIn);   

export default router;

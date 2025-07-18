// import required packages
import express from "express";

import UserController from "./user.controller.js";
const userController = new UserController();

const router = express.Router();


// user registration
router.post('/signup',  userController.signUp)

// user signIn
router.post('/signin',  userController.signIn)

export default router;
// Import required packages and middleware
import express from "express";
import jwtAuth from "../../middleware/jwt.middleware.js";
import PostController from "./post.controller.js";

// Initialize controller and router
const router = express.Router();
const postController = new PostController();

// Routes
// Create a new post
router.post("/", jwtAuth, postController.createNewPost);

// Get all posts
router.get("/all", postController.getAllPosts);              

// Get post by ID
router.get("/:id", postController.getPostById);            

// Get posts by logged-in user
router.get("/", jwtAuth, postController.getPostByUserCredentials);     

// Update post by ID
router.put("/:id", postController.updatePostById);   

// Delete post by ID
router.delete("/:id", postController.deletePostById);               

export default router;

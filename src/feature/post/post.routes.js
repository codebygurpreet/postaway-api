// Import required packages and middleware
import express from "express";
import jwtAuth from "../../middleware/jwt.middleware.js";
import PostController from "./post.controller.js";
import upload from "../../middleware/multer.middleware.js";

// Initialize controller and router
const router = express.Router();
const postController = new PostController();

// Routes
// Create a new post
router.post("/", jwtAuth, upload.single('imageUrl'),  postController.createNewPost);

// Get all posts
router.get("/all", postController.getAllPosts);       

// 1. Additional Task Filter By Caption
router.get("/filter", postController.filterByCaption);

// 3. Additional Task Implement sorting of posts based on user engagement and date
router.get("/sorted", jwtAuth, postController.getSortedPosts);

// Get post by ID
router.get("/:id", postController.getPostById);            

// Get posts by logged-in user
router.get("/", jwtAuth, postController.getPostByUserCredentials);     

// Update post by ID
router.put("/:id", upload.none(), jwtAuth, postController.updatePostById);   

// Delete post by ID
router.delete("/:id", jwtAuth, postController.deletePostById);   

// 2. Additional Task post.routes.js
router.patch("/:id/status", upload.none(), jwtAuth, postController.postStatus);


export default router;

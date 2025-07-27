// import required packages
import express from 'express';
import LikeController from './like.controller.js';
import jwtAuth from '../../middleware/jwt.middleware.js';


// Initialize controller and router
const router = express.Router();
const likeController = new LikeController()

// Routes
// Add Like
router.post('/toggle/:postid', jwtAuth, likeController.addLike)

// Retrieve all likes for a specific post
router.get('/:postid', likeController.getAllLikesForPost)

// delete all likes for a specific post
router.delete('/toggle/:postid', jwtAuth, likeController.deleteLike)

// // Toggle like status for a specific post
// router.get('/toggle/:postid',)

export default router;

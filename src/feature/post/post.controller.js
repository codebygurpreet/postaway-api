// post.controller.js
import ApplicationError from "../../../utils/applicationError.js";
import PostModel from "./post.model.js";

export default class PostController {
  createNewPost(req, res, next) {
    try {
      const userId = req.userID;
      const { caption } = req.body;

      if (!req.file) {
        throw new ApplicationError("Image file is required", 400);
      }

      if (!caption) {
        throw new ApplicationError("Caption are required", 400);
      }

      const imageUrl = req.file.filename;
      const post = PostModel.createNewPost(userId, caption, imageUrl);

      if (!post) {
        throw new ApplicationError("Failed to create post", 500);
      }

      return res.status(201).json({ success: true, message: "Post created successfully", post });

    } catch (err) {
      next(err);
    }
  }

  getAllPosts(req, res, next) {
    try {
      const posts = PostModel.getAllPosts();
      if (!posts) throw new ApplicationError("There are no posts yet", 404);

      return res.status(200).json({ success: true, message: "All posts retrieved", posts });

    } catch (err) {
      next(err);
    }
  }

  getPostById(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      if (!id) throw new ApplicationError("Invalid post ID", 400);

      const post = PostModel.getPostById(id);
      if (!post) throw new ApplicationError("Post not found", 404);

      return res.status(200).json({ success: true, message: "Post retrieved", post });

    } catch (err) {
      next(err);
    }
  }

  getPostByUserCredentials(req, res, next) {
    try {
      const userId = req.userID;
      if (!userId) throw new ApplicationError("User ID required", 400);

      const posts = PostModel.getPostByUserCredentials(userId);
      return res.status(200).json({ success: true, message: `Posts by user ${userId}`, posts });

    } catch (err) {
      next(err);
    }
  }

  updatePostById(req, res, next) {
    try {
      const userId = req.userID;
      const postId = parseInt(req.params.id);
      const data = req.body;

      if (!postId || !userId) throw new ApplicationError("Missing post ID or user ID", 400);

      const updatedPost = PostModel.updatePostById(postId, userId, data);
      if (!updatedPost) throw new ApplicationError("Post not found or update failed", 404);

      res.status(200).json({ success: true, message: "Post updated successfully", updatedPost });

    } catch (err) {
      next(err);
    }
  }

  deletePostById(req, res, next) {
    try {
      const userId = req.userID;
      const postId = parseInt(req.params.id);
      if (!postId) throw new ApplicationError("Post ID is required", 400);

      const deletePost = PostModel.deletePostById(postId, userId);
      if (!deletePost) throw new ApplicationError("Post not found", 404);

      res.status(200).json({ success: true, message: "Post deleted successfully", deletePost });

    } catch (err) {
      next(err);
    }
  }
}

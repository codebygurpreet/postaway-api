// import required packages
import CommentModel from "./comment.model.js";
import PostModel from "../post/post.model.js";

export default class CommentController {

    getAllComment(req, res) {
        try {
            const postId = req.params.id;

            // Get all posts and find the specific one
            const posts = PostModel.getAllPosts();
            const post = posts.find(p => p.id == postId);

            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: "Post not found"
                });
            }

            // Get all comments for the specific post
            const comments = CommentModel.getAllComment(postId);
            if (comments.length === 0) {
                throw new Error("No comments found for this post");
            }

            return res.status(200).json({
                success: true,
                message: "Comments found",
                comments
            });

        } catch (err) {
            console.error("Error in getAllComment:", err.message);
            return res.status(500).json({
                success: false,
                message: err.message || "Something went wrong while fetching comments"
            });
        }
    }


    createComment(req, res) {
        try {
            const userId = req.userID;
            const postId = parseInt(req.params.id);
            const { content } = req.body;

            // Basic validation
            if (!userId || !postId || !content?.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "User ID, Post ID, and content are required"
                });
            }


            // Check if postId exists in posts array
            const posts = PostModel.getAllPosts();
            const postExists = posts.some(post => post.id === postId);

            if (!postExists) {
                return res.status(404).json({
                    success: false,
                    message: `Post with ID ${postId} does not exist`
                });
            }

            // Create comment
            const newComment = CommentModel.createComment(userId, postId, content.trim());

            return res.status(201).json({
                success: true,
                message: "Comment added successfully",
                data: newComment
            });

        } catch (err) {
            console.error("Error in Adding New Comment:", err.message);

            return res.status(500).json({
                success: false,
                message: err.message || "Something went wrong while adding the comment"
            });
        }
    }

    deleteComment(req, res) {
        try {
            const userId = req.userID;
            const commentId = req.params.id;

            const deletedComment = CommentModel.deleteComment(commentId, userId);

            if (!deletedComment) {
                return res.status(404).json({
                    success: false,
                    message: "Comment not found or unauthorized to delete"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Comment deleted successfully",
                data: deletedComment
            });

        } catch (err) {
            console.error("Error in deleting comment:", err.message);

            return res.status(500).json({
                success: false,
                message: err.message || "Something went wrong while deleting the comment"
            });
        }
    }


    updateComment() {

    }


}
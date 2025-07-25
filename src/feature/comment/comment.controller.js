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


    createComment() {

    }

    deleteComment() {

    }

    updateComment() {

    }


}
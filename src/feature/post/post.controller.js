import PostModel from "./post.model.js";

export default class PostController {
  async createNewPost(req, res) {
    try {
      const userId = req.userID;
      const {caption} = req.body;
      const imageUrl = req.file.filename;
      // console.log(imageUrl)

      const post = PostModel.createNewPost(userId, caption, imageUrl);
      console.log(post)
      return res.status(201).json({ success : true, message: "Post created successfully", post });

    } catch (err) {
      console.error("Create Post Error:", err.message);
      return res.status(500).json({ success : false, message: err.message || "Internal Server Error" });
    }
  }

  async getAllPosts(req, res) {
    try {
      const posts = PostModel.getAllPosts();
      return res.status(200).json({ message: "All posts retrieved", posts });

    } catch (err) {
      console.error("Get All Posts Error:", err.message);
      return res.status(500).json({ message: err.message || "Internal Server Error" });
    }
  }

  async getPostById(req, res) {
    try {
      const { id } = req.params;
      const post = PostModel.getPostById(id);

      return res.status(200).json({ message: "Post retrieved", post });

    } catch (err) {
      console.error("Get Post By ID Error:", err.message);
      return res.status(404).json({ message: err.message || "Post not found" });
    }
  }

  async getPostByUserCredentials(req, res) {
    try {
      const userId = req.userID;
      const posts = PostModel.getPostByUserCredentials(userId);

      return res.status(200).json({ message: `Posts by user ${userId}`, posts });

    } catch (err) {
      console.error("Get Posts By User Error:", err.message);
      return res.status(500).json({ message: err.message || "Internal Server Error" });
    }
  }

  async updatePostById(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedPost = PostModel.updatePostById(id,data);

      res.status(200).json({ success: true, message: "Post updated successfully", updatedPost})

    } catch (err) {
      console.error("Update Posts By Id Error:", err.message);
      return res.status(404).json({ message: err.message || "Post not found" });
    }
  }

  async deletePostById(req, res) {
    try {
      const { id } = req.params;
      const deletePost = PostModel.deletePostById(id);

      res.status(200).json({ success: true, message: "Post deleted successfully", deletePost})

    } catch (err) {
      console.error("Delete Posts By Id Error:", err.message);
      return res.status(404).json({ success: false, message: err.message || "Post not found" });
    }
  }

  
}

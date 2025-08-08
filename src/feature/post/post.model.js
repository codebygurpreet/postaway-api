import LikeModel from "../like/like.model.js";
import CommentModel from "../comment/comment.model.js";

// post.model.js
let posts = [
  {
    id: 1,
    userId: 1,
    caption: "First post",
    imageUrl: "https://example.com/image1.jpg",
    status: "draft",
    createdAt: new Date("2024-08-01T10:00:00Z"),
  },
  {
    id: 2,
    userId: 1,
    caption: "Second post",
    imageUrl: "https://example.com/image1.jpg",
    status: "published",
    createdAt: new Date("2024-08-02T11:30:00Z"),
  },
  {
    id: 3,
    userId: 2,
    caption: "Third post",
    imageUrl: "https://example.com/image2.jpg",
    status: "published",
    createdAt: new Date("2024-08-03T09:15:00Z"),
  },
  {
    id: 4,
    userId: 2,
    caption: "Fourth post",
    imageUrl: "https://example.com/image2.jpg",
    status: "published",
    createdAt: new Date("2024-08-04T14:45:00Z"),
  },
  {
    id: 5,
    userId: 3,
    caption: "Fifth post",
    imageUrl: "https://example.com/image3.jpg",
    status: "published",
    createdAt: new Date("2024-08-05T16:20:00Z"),
  },
];


export default class PostModel {
  constructor(id, userId, caption, imageUrl, status, createdAt = new Date()) {
    this.id = id;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
    this.status = status;
    this.createdAt = createdAt;
  }

  static createNewPost(userId, caption, imageUrl, status) {
    if (!userId || !caption) return null;

    const newPost = new PostModel(
      posts.length + 1,
      userId,
      caption,
      imageUrl,
      status
    );
    posts.push(newPost);
    return newPost;
  }

  static getAllPosts() {
    return posts.length > 0 ? posts : null;
  }

  static getPostById(id) {
    return posts.find((post) => post.id == id) || null;
  }

  static getPostByUserCredentials(userId) {
    if (!userId) return null;
    return posts.filter((post) => post.userId === userId);
  }

  static updatePostById(postId, userId, data) {
    const index = posts.findIndex(
      (post) => post.id === postId && post.userId === userId
    );
    if (index === -1) return null;

    posts[index] = {
      ...posts[index],
      ...data,
    };

    return posts[index];
  }

  static deletePostById(postId, userId) {
    const index = posts.findIndex(
      (post) => post.id === postId && post.userId === userId
    );
    if (index === -1) return null;

    const deleted = posts[index];
    posts.splice(index, 1);
    return deleted;
  }

  // Additional Task
  // 1. Filter by caption
  static filterByCaption(caption) {
    const searchWords = caption.toLowerCase().trim().split(/\s+/);

    return posts.filter((post) => {
      const postCaption = post.caption.toLowerCase();
      return searchWords.every((word) => postCaption.includes(word));
    });
  }

  // 2. Add a feature to save a post as a draft and to achieve a post
  static postStatus(userId, postId, newStatus) {
    const postIndex = posts.findIndex(
      (p) => p.id == postId && p.userId == userId
    );
    if (postIndex === -1) {
      return { error: "NOT_FOUND" };
    }

    const currentStatus = posts[postIndex].status;
    const allowedTransitions = {
      draft: ["published"],
      published: ["archived"],
      archived: ["published"],
    };

    if (!allowedTransitions[currentStatus]?.includes(newStatus)) {
      return {
        error: "INVALID_TRANSITION",
        currentStatus,
        newStatus,
      };
    }

    posts[postIndex].status = newStatus;
    return { updatedPost: posts[postIndex] };
  }

  // 3. Implement sorting of posts based on user engagement and date
  static getPostsSorted(by = "engagement") {
    if (!posts || posts.length === 0) {
      throw new ApplicationError("No posts found", 404);
    }

    // Compute engagement for each post
    const postsWithEngagement = posts.map((post) => {
      const likes = LikeModel.countByPostId(post.id);
      const comments = CommentModel.countByPostId(post.id);
      const engagement = likes + comments;

      return {
        ...post,
        engagement,
      };
    });

    if (by === "date") {
      return postsWithEngagement.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    // Default: sort by engagement, then date
    return postsWithEngagement.sort((a, b) => {
      if (b.engagement === a.engagement) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return b.engagement - a.engagement;
    });
  }
}

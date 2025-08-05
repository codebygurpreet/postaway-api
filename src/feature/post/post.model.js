// post.model.js
let posts = [
  {
    id: 1,
    userId: 1,
    caption: "First post",
    imageUrl: "https://example.com/image1.jpg",
    status: "published"
  },
  {
    id: 2,
    userId: 1,
    caption: "Second post",
    imageUrl: "https://example.com/image1.jpg",
    status: "published"
  },
  {
    id: 3,
    userId: 2,
    caption: "Third post",
    imageUrl: "https://example.com/image2.jpg",
    status: "published"
  },
  {
    id: 4,
    userId: 2,
    caption: "Fourth post",
    imageUrl: "https://example.com/image2.jpg",
    status: "published"
  },
  {
    id: 5,
    userId: 3,
    caption: "Fifth post",
    imageUrl: "https://example.com/image3.jpg",
    status: "published"
  },
];

export default class PostModel {
  constructor(id, userId, caption, imageUrl, status) {
    this.id = id;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
    this.status = status;
  }

  static createNewPost(userId, caption, imageUrl, status) {
    if (!userId || !caption) return null;

    const newPost = new PostModel(posts.length + 1, userId, caption, imageUrl, status);
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

}

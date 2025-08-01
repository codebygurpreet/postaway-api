// post.model.js
let posts = [
  { id: 1, userId: 1, caption: 'First post', imageUrl: 'https://example.com/image1.jpg' },
  { id: 2, userId: 1, caption: 'Second post', imageUrl: 'https://example.com/image1.jpg' },
  { id: 3, userId: 2, caption: 'Third post', imageUrl: 'https://example.com/image2.jpg' },
  { id: 4, userId: 2, caption: 'Fourth post', imageUrl: 'https://example.com/image2.jpg' },
  { id: 5, userId: 3, caption: 'Fifth post', imageUrl: 'https://example.com/image3.jpg' },
];

export default class PostModel {
  constructor(id, userId, caption, imageUrl) {
    this.id = id;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
  }

  static createNewPost(userId, caption, imageUrl) {
    if (!userId || !caption) return null;

    const newPost = new PostModel(posts.length + 1, userId, caption, imageUrl);
    posts.push(newPost);
    return newPost;
  }

  static getAllPosts() {
    return posts.length > 0 ? posts : null;
  }

  static getPostById(id) {
    return posts.find(post => post.id == id) || null;
  }

  static getPostByUserCredentials(userId) {
    if (!userId) return null;
    return posts.filter(post => post.userId === userId);
  }

  static updatePostById(postId, userId, data) {
    const index = posts.findIndex(post => post.id === postId && post.userId === userId);
    if (index === -1) return null;

    posts[index] = {
      ...posts[index],
      ...data,
    };

    return posts[index];
  }

  static deletePostById(postId, userId) {
    const index = posts.findIndex(post => post.id === postId && post.userId === userId);
    if (index === -1) return null;

    const deleted = posts[index];
    posts.splice(index, 1);
    return deleted;
  }
}

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
    if (!userId || !caption || !imageUrl) {
      throw new Error("Missing post data");
    }

    const newPost = new PostModel(posts.length + 1, userId, caption, imageUrl);
    posts.push(newPost);
    return newPost;
  }

  static getAllPosts() {
    return posts;
  }

  static getPostById(id) {
    const post = posts.find(post => post.id == id);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  }

  static getPostByUserCredentials(userId) {
    if (!userId) {
      throw new Error("User ID required");
    }
    return posts.filter(post => post.userId === userId);
  }
  
  static updatePostById(id, data) {
    const index = posts.findIndex(post => post.id == id);
    
    if(index === -1){
      throw new Error("Post not Found");
    }

    posts[index] = {
      ...posts[index],
      ...data,
    };

    return posts[index];
  }
  static deletePostById(id, data) {
      if (!id) {
      throw new Error("Missing id ");
    }
    const index = posts.findIndex(post => post.id == id);
    
    if(index === -1){
      throw new Error("Post not Found");
    }

    posts.splice(index,1)

    return posts[index];
  }
}

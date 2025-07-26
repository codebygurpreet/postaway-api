// Dummy comment data (for in-memory operations)
// Dummy comment data (for in-memory operations)
let comments = [
    { id: 1, userId: 1, postId: 1, content: 'First comment on post 1' },
    { id: 2, userId: 2, postId: 1, content: 'Second comment on post 1' },
    { id: 3, userId: 3, postId: 2, content: 'First comment on post 2' }
];

export default class CommentModel {

    constructor(id, userId, postId, content) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    static getAllComment(postId) {
        return comments.filter(comment => comment.postId == postId);
    }


    static createComment(userId, postId, content) {
        const newComment = new CommentModel(comments.length + 1, userId, postId, content);

        comments.push(newComment);
        return newComment;
    }


    deleteComment() {

    }

    updateComment() {

    }
}


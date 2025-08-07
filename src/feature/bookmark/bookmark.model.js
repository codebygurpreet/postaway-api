// import required packages
import PostModel from '../post/post.model.js'
const AllBookMarks = [
    { id: 1, userId: 1, postId: 2 }
];

export default class BookMarkModel {
    static getBookmarks(userId) {
        if (!AllBookMarks || AllBookMarks.length === 0) {
            return null; // Let controller handle this
        }

        const userBookmarkedPosts = AllBookMarks.filter(p => p.userId === userId);

        if (userBookmarkedPosts.length === 0) {
            return []; // Let controller handle empty bookmarks
        }

        const allPosts = PostModel.getAllPosts();

        const bookmarkedPosts = allPosts.filter(post =>
            userBookmarkedPosts.some(bookmark => bookmark.postId === post.id && post.status != 'draft')
        );

        return bookmarkedPosts;
    }
}

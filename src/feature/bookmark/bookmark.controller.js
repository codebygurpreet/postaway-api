// import required packages
import ApplicationError from '../../../utils/applicationError.js';
import BookMarkModel from './bookmark.model.js';

export default class BookmarkController {
    
    getBookmarks(req, res, next) {
        try {
            const userId = parseInt(req.userID);
            const getAllBookmarkedPosts = BookMarkModel.getBookmarks(userId);
            
            if (getAllBookmarkedPosts === null) {
                throw new ApplicationError('There are no bookmarked posts in the system.', 404);
            }
            
            if (getAllBookmarkedPosts.length === 0) {
                throw new ApplicationError('No bookmarks found for this user.', 404);
            }

            res.status(200).json({
                success: true,
                message: "All Bookmarked Posts",
                posts: getAllBookmarkedPosts,
            });
        } catch (err) {
            next(err);
        }
    }
    
    addBookmark(req, res, next) {
        
    }

    removeBookmark(req, res, next) {
    }
}

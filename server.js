// import required packages
import express from "express";
import loggerMiddleware from "./src/middleware/logger.middleware.js";
import errorHandler from "./src/middleware/errorHandler.middleware.js";


// load environmental variable from .env file

// import route files
import userRoutes from "./src/feature/user/user.routes.js"
import postsRoutes from "./src/feature/post/post.routes.js"
import commentRoutes from "./src/feature/comment/comment.routes.js"
import likeRoutes from "./src/feature/like/like.routes.js"
import bookmarkRoutes from "./src/feature/bookmark/bookmark.routes.js"


// create an instance of express app
const app = express();


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing form data
app.use(loggerMiddleware); // using logger middleware for every request

// User Routes
app.use('/api/user', userRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/bookmark', bookmarkRoutes);

app.get('/', (req,res)=>{
    res.send("Welcome to postaway-api");
})

// error handler – always comes LAST
app.use(errorHandler);


// set up server
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log("server is listening on 3000")
})
// import required packages
import express from "express";


// load environmental variable from .env file

// import route files
import userRoutes from "./src/feature/user/user.routes.js"
import postsRoutes from "./src/feature/post/post.routes.js"

// create an instance of express app
const app = express();


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing form data


// User Routes
app.use('/api/user', userRoutes);
app.use('/api/posts', postsRoutes);

app.get('/', (req,res)=>{
    res.send("Welcome to postaway-api");
})
// set up server
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log("server is listening on 3000")
})
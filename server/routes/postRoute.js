const { createPost, getPostDetails, updatePost, deletePost, toggleLikePost, addComment, getMyPosts, getAllPosts, editComment, deleteComment } = require('../controllers/postController');
const { isAuthenticated } = require('../middlewares/auth');
const { createPostValidation, addCommentValidation } = require('../middlewares/postValidation');

const router = require('express').Router();

//create post route
router.post("/post", isAuthenticated, createPostValidation.errors, createPostValidation.validate, createPost);

//get my posts route
router.get("/posts/me", isAuthenticated, getMyPosts);

//get all posts route
router.get("/posts/all", getAllPosts);

//get post details route
router.get("/post/:id", isAuthenticated, getPostDetails);

//update post route
router.put("/post/:id", isAuthenticated, updatePost);

//delete post route
router.delete("/post/:id", isAuthenticated, deletePost);

//toggle like route
router.get("/post/:id/like", isAuthenticated, toggleLikePost);

//add comment route
router.post("/post/:id/comment", isAuthenticated, addCommentValidation.errors, addCommentValidation.validate, addComment);

//edit comment route
router.put("/post/:postid/comment/:commentid", isAuthenticated, addCommentValidation.errors, addCommentValidation.validate, editComment);

//delete comment route
router.delete("/post/:postid/comment/:commentid", isAuthenticated, deleteComment);

module.exports = router;
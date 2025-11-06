let express = require('express');
let router = express.Router();

// importing controllers

let {addComment} = require('../controllers/commentController');
let {createPost, getAllPosts} = require('../controllers/postController');
let {likePost} = require('../controllers/likeController');

// maping routes to controllers

router.post('/post/create', createPost);
router.get('/post/all', getAllPosts);
router.post('/comment/addComment', addComment);
router.post('/post/like', likePost);

module.exports = router;

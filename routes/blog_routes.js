let express = require('express');
let router = express.Router();

// importing controllers

let {addComment} = require('../controllers/commentController');
let {createPost, getAllPosts} = require('../controllers/postController');
let {likePost} = require('../controllers/likeController');
let {sendOtp, signup,login} = require(`../controllers/auth`);

// importing middleware
let {auth, isAdmin,isStudent} = require('../middleware/auth');
// importing middleware

// maping routes to controllers
router.post('/auth/sendOtp', sendOtp);
router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.post('/post/create', createPost);
router.get('/post/all', getAllPosts);
router.post('/comment/addComment', addComment);
router.post('/post/like', likePost);

// middleware 
router.get('/test', auth, (req,res)=>{
    return res.status(200).json({
        success : true,
        message : `Blog app test auth is working fine`,
    })
})

router.get('/student', auth,isStudent, (req,res)=>{
    return res.status(200).json({
        success : true,
        message : `the student rout is working and the  email : ${res}`,
    })
})

router.get('/admin',auth, isAdmin,(req,res)=>{
    return res.status(200).json({
        success: true,
        message : `the admin route is working with email : ${res}`,
    })
})

// middleware 



module.exports = router;

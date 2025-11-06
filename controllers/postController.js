let Post = require('../models/postModel');

exports.createPost = async (req, res) => {
    try {
        let { title, body } = req.body;

        let post = new Post({
            title,
            body,
            // author,
        });

        let savedPost = await post.save();
        
        res.status(201).json({
            success: true,
            data: savedPost,
            message: 'Post created successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
            console: console.log("Error while creating post"),
        });
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        let posts = await Post.find()
        // .populate('author')
        .populate('comment')
        .populate('like')
        .exec();

        res.status(200).json({
            success: true,
            data: posts,
            message: 'Posts fetched successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
            console: console.log("Error while fetching posts"),
        });
    }
}
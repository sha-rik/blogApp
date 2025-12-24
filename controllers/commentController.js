let Post = require('../models/postModel');
let Comment = require('../models/commentModel');

exports.addComment = async (req, res) => {
    try {

        // request se data fetch kiye
        let { postId, userId, comment } = req.body;

        // naya comment obeject banaya
        let newComment = new Comment({
            post: postId,
            user: userId,
            comment_body: comment,
        })

        // comment save kiya database me
        let updatePost = await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: saveComment._id } },
            { new: true }
        )
            .populate('comments')
            .exec();

        if (!updatePost) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }
        let saveComment = await newComment.save();

        res.status(201).json({
            success: true,
            data: updatePost,
            message: 'Comment added successfully',
        });
    }
    catch (error) {

        res.status(500).json({
            error: error.message,
            console: console.log("  Error while adding comment"),
        });
    }
}
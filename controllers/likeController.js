let Like = require('../models/likeModel');
let Post = require('../models/postModel');
let User = require('../models/userModel');

exports.likePost = async (req, res) => {
    try {
        let { postId, userId } = req.body;
        
        let like = await Like.findOne(
            { 
                post: postId,
                user: userId,
            }
        )
        if(like) {
            // remove the like
            await Like.deleteOne(
                {
                    _id: like._id,
                }
            );
            // remove like from post's like array
            let updatePost = await Post.findByIdAndUpdate(
                postId,
                {
                    $pull: { like: like._id }
                },
                {
                    new: true 
                }
            );
            return res.status(200).json({
                success: true,
                data: updatePost,
                message: 'Post unliked',
            });
            

        }
        else {
            // add the like
            const newLike = new Like({
                post: postId,
                user: userId,
            });

            let saveLike = await newLike.save();

            let updatePost = await Post.findByIdAndUpdate(
                postId,
                {$push: { like: saveLike._id }},
                {new: true}
            )
            .populate('like')
            .exec();

            return res.status(200).json({
                success: true,
                data: updatePost,
                message: 'Post liked',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
            message: `Error while liking/unliking the post`,
        });
    }
}
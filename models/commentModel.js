let mongoose= require('mongoose');

let commentSchema = new mongoose.Schema({
    post : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comment_body:{
        type: String,
        required: true,
    },
    like:{
        type: Number,
        default: 0,
        required: true,
    }
})

module.exports = mongoose.model('comment', commentSchema);

let mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        maxLength: 200,
    },
    body: {
        type: String,
        required: true,
    },
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comment : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    like : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like',
    }]
})

module.exports = mongoose.model('Post', postSchema);
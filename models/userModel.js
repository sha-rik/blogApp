let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
    },
    token: {
        type: String,
    },
    role:
    {
        type: String,
        enum: ["Admin", "Student", "Instructor"],
        require: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
    resetPasswordExpires: {
        type: Date,
    },
},
    { timestamps: true }
)
module.exports = mongoose.model('User', userSchema);
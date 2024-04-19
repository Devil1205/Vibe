const mongoose = require('mongoose');
const Post = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    post: {
        caption: String,
        images: [
            {
                public_id: String,
                url: String
            }
        ] 
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
            comment: {
                type: String,
                required: [true, "Comment is required"]
            },
            createdAt: Date
        }
    ]
});

module.exports = mongoose.model("Post", Post);
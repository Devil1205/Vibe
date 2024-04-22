const Post = require('../models/postSchema');

//create post controller
exports.createPost = async (req, res, next) => {
    try {
        const { caption, images } = req.body;
        const post = new Post({
            owner: req.user._id,
            createdAt: Date.now()
        })
        if (caption)
            post.caption = caption;
        //cloudinary upload later
        if (images)
            post.images = images;

        await post.save();
        const user = req.user;
        user.posts.push(post._id);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Post added",
            post
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//get my posts controller
exports.getMyPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({ owner: req.user._id })

        return res.status(200).json({
            success: true,
            posts
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//get all posts controller
exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate([{path: "owner", select: "name image"}, {path: "likes", select: "name image"}, {path: "comments.user", select: "name image"}]);

        return res.status(200).json({
            success: true,
            posts
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//get post details controller
exports.getPostDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findOne({ owner: req.user._id, _id: id }).populate([{path: "owner", select: "name image"}, {path: "likes", select: "name image"}, {path: "comments.user", select: "name image"}]);

        if (!post)
            return res.status(400).json({
                success: false,
                message: "Post not found"
            });

        return res.status(200).json({
            success: true,
            post
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//edit post controller
exports.updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { caption } = req.body;
        const post = await Post.findOne({ owner: req.user._id, _id: id })

        if (!post)
            return res.status(400).json({
                success: false,
                message: "Post not found"
            });

        post.caption = caption;
        post.editedAt = Date.now();
        await post.save();

        return res.status(200).json({
            success: true,
            message: "Post updated"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//delete post controller
exports.deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findOneAndDelete({ owner: req.user._id, _id: id })

        if (!post)
            return res.status(400).json({
                success: false,
                message: "Post not found"
            });

        return res.status(200).json({
            success: true,
            message: "Post deleted"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//toggle like controller
exports.toggleLikePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post)
            return res.status(400).json({
                success: false,
                message: "Post not found"
            });
        if (post.likes.includes(req.user._id))
            post.likes.splice(post.likes.indexOf(req.user._id), 1);
        else
            post.likes.push(req.user._id);
        await post.save();
        return res.status(200).json({
            success: true,
            message: "Toggle like success"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//add comment controller
exports.addComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const post = await Post.findById(id);

        if (!post)
            return res.status(400).json({
                success: false,
                message: "Post not found"
            });

        post.comments.push({
            user: req.user._id,
            comment,
            createdAt: Date.now()
        });
        await post.save();
        return res.status(200).json({
            success: true,
            message: "Comment added"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//edit comment controller
exports.editComment = async (req, res, next) => {
    try {
        const { postid, commentid } = req.params;
        const { comment } = req.body;
        const post = await Post.findOne({ _id: postid, comments: { $elemMatch: { _id: commentid, user: req.user._id } } });

        if (!post)
            return res.status(400).json({
                success: false,
                message: "Comment not found"
            });
        const ind = post.comments.findIndex(elem => elem._id == commentid)
        post.comments[ind].comment = comment;
        post.comments[ind].editedAt = Date.now();
        await post.save();
        return res.status(200).json({
            success: true,
            message: "Comment updated",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//delete comment controller
exports.deleteComment = async (req, res, next) => {
    try {
        const { postid, commentid } = req.params;
        const post = await Post.findOne({ _id: postid, comments: { $elemMatch: { _id: commentid, user: req.user._id } } });

        if (!post)
            return res.status(400).json({
                success: false,
                message: "Comment not found"
            });

        const ind = post.comments.findIndex(elem => elem._id == commentid)
        post.comments.splice(ind, 1);
        await post.save();
        return res.status(200).json({
            success: true,
            message: "Comment deleted",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

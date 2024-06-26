const User = require("../models/userSchema");
const { sendMail } = require("../utils/sendMail");
const { storeToken } = require("../utils/storeJwtToken");
const crypto = require('crypto');

//register user controller
exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, phone, password, image } = req.body;

        //if email id is already registered
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        if (phone && await User.findOne()) {
            return res.status(409).json({
                success: false,
                message: "Phone number already in use"
            });
        }

        user = new User({
            name,
            email,
            password,
            image,
            createdAt: Date.now()
        });

        //if phone number exists, add it to db
        if (phone)
            user.phone = phone;

        await user.save();
        storeToken(user, "Registration successful", res);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//login user controller
exports.loginUser = async (req, res, next) => {
    try {
        const { email, phone, password } = req.body;

        let user;
        if (email)
            user = await User.findOne({ email }).select("+password");
        else
            user = await User.findOne({ phone }).select("+password");

        if (!user || !await user.matchPassword(password)) {
            return res.status(409).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        storeToken(user, "Login successful", res);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//update user profile controller
exports.getProfile = async (req, res, next) => {

    const user = await User.findById(req.user.id).populate([{ path: "posts", select: "" }, { path: "followers", select: "image name" }, { path: "following", select: "image name" }]);
    return res.status(200).json({
        success: true,
        user
    });
}

//update user profile controller
exports.updateProfile = async (req, res, next) => {
    try {
        const { name, email, phone, image } = req.body;

        let user = req.user;

        user.name = name;
        user.email = email;
        user.image = image;
        //if phone number exists, add it to db
        if (phone)
            user.phone = phone;

        await user.save();
        return res.status(200).json({
            success: true,
            message: "Profile updated"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//update user profile controller
exports.updatePassword = async (req, res, next) => {
    try {
        const { oldPassword, password } = req.body;

        let user = await User.findById(req.user._id).select("+password");

        if (! await user.matchPassword(oldPassword)) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }
        user.password = password;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password updated"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }

        try {
            const token = await user.generateResetToken();
            // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${token}`;
            const resetPasswordUrl = `http://localhost:5000/api/v1/password/reset/${token}`;
            const message = `Your password reset link is : \n\n ${resetPasswordUrl} \n\nImportant: This link is only valid for 15 minutes, do not share it with anyone otherwise your account security may be compromised.`;
            const subject = "Vibe password reset";
            await user.save();
            sendMail(email, subject, message, res);
            // return res.status(200).json({
            //     success: true,
            //     resetLink: resetPasswordUrl
            // });
        }
        catch (error) {
            user.resetToken = undefined;
            user.resetTokenExpire = undefined;
            await user.save();
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

exports.resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const resetToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await User.findOne({ resetToken, resetTokenExpire: { $gt: Date.now() } }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "The reset link is invalid or has been expired"
            });
        }

        user.password = password;
        user.resetToken = undefined;
        user.resetTokenExpire = undefined;
        await user.save();
        storeToken(user, "Password reset successful", res);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//logout user controller
exports.logoutUser = async (req, res, next) => {
    try {
        return res.status(200).cookie("token", undefined).json({
            success: true,
            message: "Logout successful"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//toggle follow user controller
exports.toggleFollow = async (req, res, next) => {
    try {
        const { followId } = req.body;
        if (followId == req.user._id) {
            return res.status(400).json({
                success: false,
                message: "Cannot follow yourself"
            });
        }

        const followedUser = await User.findById(followId);
        if (!followedUser) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist"
            });
        }
        const user = req.user;
        const ind = user.following.indexOf(followId);
        if (ind !== -1) {
            user.following.splice(ind, 1);
            const i = followedUser.followers.indexOf(req.user._id);
            followedUser.followers.splice(i, 1);
        }
        else {
            user.following.push(followId);
            followedUser.followers.push(req.user._id);
        }

        await user.save();
        await followedUser.save();
        return res.status(200).json({
            success: true,
            message: "Follow status changed"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//get user details controller
exports.getUserDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        let user = await User.findById(id).populate([{ path: "posts", select: "" }, { path: "followers", select: "image name" }, { path: "following", select: "image name" }]);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist"
            });
        }
        const ind = req.user.following.indexOf(id);
        if (ind === -1) {
            user = await User.findById(id);
            user.posts = [];
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//get user suggestions controller
exports.getUserSuggestions = async (req, res, next) => {
    try {
        //number to people to suggest to follow
        let n = 10;

        //get current user's following list
        const following = req.user.following;
        //get current user's followers list
        const followers = req.user.followers;

        //get users whose followers are in current user's following or followers list excluding already followed
        const data = await User.find({ followers: { $in: following.concat(followers), $nin: [req.user._id] } }).select("name image");
        //get remaining random users from db to fulfil the number of suggestions keeping already followed & own account excluded
        const randomUsers = await User.aggregate([{ $match: { "_id": { "$nin": data.map(elem => elem._id).concat(req.user._id) }, "followers": { "$in": [req.user._id] } } }, { $sample: { size: n - data.length } }, { $project: { "name": 1, "image": 1 } }]);;

        return res.status(200).json({
            success: true,
            user: data.concat(randomUsers),
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
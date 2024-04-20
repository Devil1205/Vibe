const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    phone: {
        type: Number,
        minLength: [10, "Invalid phone number"],
        maxLength: [10, "Invalid phone number"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be atleast 6 characters"]
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    posts: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Post"
        }
    ],
    followers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    resetToken: String,
    resetTokenExpire: Date,
    createdAt: Date,
    updatedAt: Date
});

User.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

User.methods.generateToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
    return token;
}

User.methods.matchPassword = async function (password) {
    let matched = await bcrypt.compare(password, this.password);
    return matched;
}

module.exports = mongoose.model('User', User);

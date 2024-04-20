const userSchema = require("../models/userSchema");
const User = require("../models/userSchema");
const { storeToken } = require("../utils/storeJwtToken");

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
            user = await User.findOne({ email });
        else
            user = await User.findOne({ phone });

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

    return res.status(200).json({
        success: true,
        user: req.user
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
        const { password } = req.body;

        let user = req.user;

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
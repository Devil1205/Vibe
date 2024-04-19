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
            image
        });

        //if phone number exists, add it to db
        if (phone)
            user.phone = phone;

        await user.save();
        storeToken(user, "User registered successfully", res);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
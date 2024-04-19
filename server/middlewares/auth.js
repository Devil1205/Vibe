const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
exports.isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookie("token");
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Please kindly login first."
            })
        }
        const id = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id);
        req.user = user;
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Please kindly login first."
        })
    }

}
const { body, validationResult } = require('express-validator');

exports.registerUserValidation = {
    errors: [
        body("name")
            .notEmpty().withMessage("Name is required"),

        body("email")
            .isEmail().withMessage("Invalid email"),

        body("phone")
            .isLength({ min: 10, max: 10 }).withMessage("Invalid phone number")
            .optional(),

        body("password")
            .isLength({ min: 6 }).withMessage("Password must be atleast 6 characters"),

        body("image.public_id").notEmpty().withMessage("Image public id is required"),
        body("image.public_id").notEmpty().withMessage("Image url is required")
    ],

    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.errors[0].msg });
        }
        next();
    }
}
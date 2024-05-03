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

        body("image.public_id")
        .if(body("image").notEmpty())
        .notEmpty().withMessage("Image public id is required"),

        body("image.url")
        .if(body("image").notEmpty())
        .notEmpty().withMessage("Image url is required"),
    ],

    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.errors[0].msg });
        }
        next();
    }
}

exports.loginUserValidation = {
    errors: [
        body("email")
            .isEmail().withMessage("Invalid email").optional(),

        body("phone")
            .if(body("email").isEmpty())
            .notEmpty().withMessage("Invalid email or phone")
            .isLength({ min: 10, max: 10 }).withMessage("Invalid phone number"),

        body("password")
            .isLength({ min: 6 }).withMessage("Invalid password"),
    ],

    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.errors[0].msg });
        }
        next();
    }
}

exports.updateProfileValidation = {
    errors: [
        body("name")
            .notEmpty().withMessage("Name is required"),

        body("email")
            .isEmail().withMessage("Invalid email"),

        body("phone")
            .isLength({ min: 10, max: 10 }).withMessage("Invalid phone number")
            .optional(),

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

exports.updatePasswordValidation = {
    errors: [
        body("oldPassword")
            .isLength({ min: 6 }).withMessage("Incorrect old password"),
        body("password")
            .isLength({ min: 6 }).withMessage("New password must be atleast 6 characters"),
    ],

    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.errors[0].msg });
        }
        next();
    }
}

exports.forgotPasswordValidation = {
    errors:
        [
            body('email')
                .isEmail().withMessage("Invalid Email"),
        ],
    validate:
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: errors.errors[0].msg });
            }
            next();
        }
}

exports.resetPasswordValidation = {
    errors:
        [
            body("password")
                .isLength({ min: 6 }).withMessage("Password must be atleast 6 characters"),
            body("confirmPassword")
                .isLength({ min: 6 }).withMessage("Confirm password must be atleast 6 characters"),
        ],
    validate:
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: errors.errors[0].msg });
            }
            next();
        }

}

exports.toggleFollowValidation = {
    errors:
        [
            body("followId")
                .notEmpty().withMessage("followId is required"),
        ],
    validate:
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: errors.errors[0].msg });
            }
            next();
        }

}

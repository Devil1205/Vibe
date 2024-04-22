const { body, validationResult } = require('express-validator');

exports.createPostValidation = {
    errors: [
        body("caption")
            .notEmpty().withMessage("Caption is required").optional(),

        body("images[0].public_id")
            .if(body("caption").isEmpty())
            .notEmpty().withMessage("Caption or image is required"),

        body("images[0].url")
            .if(body("caption").isEmpty())
            .notEmpty().withMessage("Caption or image is required"),
    ],

    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.errors[0].msg });
        }
        next();
    }
}

exports.addCommentValidation = {
    errors: [
        body("comment")
            .notEmpty().withMessage("Comment is required"),
    ],

    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.errors[0].msg });
        }
        next();
    }
}
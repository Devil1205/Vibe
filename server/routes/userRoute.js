const { registerUser } = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/auth');
const { registerUserValidation } = require('../middlewares/userValidation');

const router = require('express').Router();

//user registeration route
router.post("/register", registerUserValidation.errors, registerUserValidation.validate, registerUser);

module.exports = router;
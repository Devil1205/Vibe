const { registerUser, loginUser, updateProfile, getProfile, updatePassword } = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/auth');
const { registerUserValidation, loginUserValidation, updateProfileValidation, updatePasswordValidation } = require('../middlewares/userValidation');

const router = require('express').Router();

//register user route
router.post("/register", registerUserValidation.errors, registerUserValidation.validate, registerUser);

//login user route
router.post("/login", loginUserValidation.errors, loginUserValidation.validate, loginUser);

//get profile route
router.get("/profile", isAuthenticated, getProfile);

//update user profile route
router.put("/profile", isAuthenticated, updateProfileValidation.errors, updateProfileValidation.validate, updateProfile);

//update user password route
router.put("/password", isAuthenticated, updatePasswordValidation.errors, updatePasswordValidation.validate, updatePassword);

module.exports = router;
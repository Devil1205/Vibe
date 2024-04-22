const { registerUser, loginUser, updateProfile, getProfile, updatePassword, forgotPassword, resetPassword, logoutUser, toggleFollow, getUserDetails } = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/auth');
const { registerUserValidation, loginUserValidation, updateProfileValidation, updatePasswordValidation, forgotPasswordValidation, resetPasswordValidation, toggleFollowValidation } = require('../middlewares/userValidation');

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

//forgot user password route
router.post("/password/forgot", forgotPasswordValidation.errors, forgotPasswordValidation.validate, forgotPassword);

//reset user password route
router.post("/password/reset/:token", resetPasswordValidation.errors, resetPasswordValidation.validate, resetPassword);

//logout user route
router.get("/logout", isAuthenticated, logoutUser);

//toggle follow user route
router.post("/follow", isAuthenticated, toggleFollowValidation.errors, toggleFollowValidation.validate, toggleFollow);

//get user details route
router.get("/user/:id", isAuthenticated, getUserDetails);

module.exports = router;
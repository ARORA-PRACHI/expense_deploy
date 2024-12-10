const express = require('express');
const {
    loginController,
    logoutController,
    signupContorller,
    changePasswordController
} = require('../controllers/userController'); // Include the new changePasswordController
const { createToken } = require('../middleware/jwtMiddleware');
const { validateJwtToken } = require('../middleware/jwtMiddleware')

const router = express.Router();

// Routes
router.post('/login', loginController, createToken); // Login route with token creation
router.get('/logout', validateJwtToken,logoutController); // Logout route
router.post('/signup', signupContorller); // Signup route
router.put('/change-password', validateJwtToken, changePasswordController); // Change password route (requires authentication)

module.exports = router;
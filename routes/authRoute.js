const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Render registration form
router.get('/register', authController.renderRegister);

// Handle registration
router.post('/register', authController.register);

// Render login form
router.get('/login', authController.renderLogin);

// Handle login
router.post('/login', authController.login);

// Handle logout
router.get('/logout', authController.logout);

// Render user details
router.get('/details', authMiddleware.authenticateToken, authController.renderUserDetails);

// Render edit user form
router.get('/edit', authMiddleware.authenticateToken, authController.renderEditUser);

// Handle user update
router.post('/edit', authMiddleware.authenticateToken, authController.updateUser);

module.exports = router;

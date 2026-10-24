const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateAuth } = require('../middleware/validateMiddleware');

router.post('/register', validateAuth, authController.register);
router.post('/login', validateAuth, authController.login);
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;

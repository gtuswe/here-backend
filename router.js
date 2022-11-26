const router = require('express').Router();
const authController = require('./controllers/authController');

// AUTHENTICATION ROUTES
router.post('/register', authController.registerInstructor);
router.post('/login', authController.loginInstructor);
router.get('/whoami', authController.whoami);


module.exports = router;
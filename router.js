const router = require('express').Router();
const authController = require('./controllers/authController');

// AUTHENTICATION ROUTES
router.post('/instructor', authController.registerInstructor);
router.post('/student', authController.registerStudent);
router.post('/login', authController.login);
router.get('/whoami', authController.whoami);


module.exports = router;
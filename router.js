const router = require('express').Router();
const authController = require('./controllers/authController');
const courseController = require('./controllers/courseController');

// AUTHENTICATION ROUTES
router.post('/instructor', authController.registerInstructor);
router.post('/student', authController.registerStudent);
router.post('/login', authController.login);
router.get('/whoami', authController.whoami);
router.get('/course', courseController.getCourses);
router.get('/course/:id', courseController.getCourse);
router.post('/course', courseController.addCourse);
router.put('/course/:id', courseController.updateCourse);
router.delete('/course/:id', courseController.deleteCourse);


module.exports = router;
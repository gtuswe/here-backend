const router = require('express').Router();
const authController = require('./controllers/authController');
const courseController = require('./controllers/courseController');
const announcementController = require('./controllers/announcementController');
const periodController = require('./controllers/periodController');
const pastCourseController = require('./controllers/pastCourseController');
const attendanceController = require('./controllers/attendanceController');

// AUTHENTICATION ROUTES
router.post('/instructor', authController.registerInstructor);
router.post('/student', authController.registerStudent);
router.post('/student/:id/attendance',attendanceController.getAttendanceForStudent);
router.post('/login', authController.login);
router.get('/whoami', authController.whoami);
router.get('/course', courseController.getCourses);
router.get('/course/:id', courseController.getCourse);
router.post('/course', courseController.addCourse);
router.put('/course/:id', courseController.updateCourse);
router.delete('/course/:id', courseController.deleteCourse);
router.post('/course/:id/student', courseController.addStudentToCourse);
router.delete('/course/:id/student', courseController.removeStudentFromCourse);
router.get('/course/:id/list', courseController.getStudentListForClass);
router.get('/course/:id/attendance', attendanceController.getAllAttendances);
router.get('/announcement', announcementController.getAnnouncements);
router.post('/announcement', announcementController.addAnnouncement);
router.put('/announcement/:id', announcementController.updateAnnouncement);
router.delete('/announcement/:id', announcementController.deleteAnnouncement);
router.get('/period', periodController.getPeriods);
router.post('/period', periodController.addPeriod);
router.put('/period/:id', periodController.updatePeriod);
router.delete('/period/:id', periodController.deletePeriod);
router.post('/pastcourse', pastCourseController.createPastCourse);
router.get('/pastcourse', pastCourseController.getPastCourses);
router.delete('/pastcourse/:id', pastCourseController.deletePastCourse);
router.get('/attendance', attendanceController.getAllAttendances);
router.post('/attendance', attendanceController.addAttendance);
router.delete('/attendance/:id', attendanceController.deleteAttendance);
router.get('/student/:id/attendance', attendanceController.getAttendanceForStudent);




module.exports = router;
const express = require('express');
const { createCourse, getCourses, getSpecificCourses, updateCourse, deleteCourse } = require('../controllers/courseController.js');
const protectTeacher = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/create').post(protectTeacher, createCourse);
router.route('/specific').get(protectTeacher, getSpecificCourses);
router.route('/update/:id').put(protectTeacher, updateCourse);
router.route('/delete/:id').delete(protectTeacher, deleteCourse);
router.get('/all', getCourses);

module.exports = router;

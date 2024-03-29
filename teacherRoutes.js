const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/teacherController.js');

router.post('/login', authUser);
router.post('/register', registerUser);

module.exports = router;

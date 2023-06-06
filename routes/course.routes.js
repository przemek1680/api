const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const verifyToken = require('../verifyToken');
router.get('/', verifyToken, courseController.courseList);

router.post('/add', verifyToken, courseController.courseAdd);

router.post('/edit/:id', verifyToken, courseController.courseEdit);
router.get('/edit/:id', verifyToken, courseController.courseEditPage);

router.post(
  '/delete/:id',
  verifyToken,
  courseController.courseDelete
);

module.exports = router;

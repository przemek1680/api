const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const verifyToken = require('../verifyToken');

router.post('/create', verifyToken, studentController.createStudent);
router.get('/', verifyToken, studentController.getAllStudents);
router.get('/:id', verifyToken, studentController.getStudent);
router.put(
  '/:id/update',
  verifyToken,
  studentController.updateStudent
);
router.delete(
  '/:id/delete',
  verifyToken,
  studentController.deleteStudent
);

module.exports = router;

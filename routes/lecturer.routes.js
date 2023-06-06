const express = require('express');
const router = express.Router();
const lecturerController = require('../controllers/lecturer.controller');

router.post('/create', lecturerController.createLecturer);
router.get('/', lecturerController.getAllLecturers);
router.get('/:id', lecturerController.getLecturer);
router.put('/:id/update', lecturerController.updateLecturer);
router.delete('/:id/delete', lecturerController.deleteLecturer);

module.exports = router;

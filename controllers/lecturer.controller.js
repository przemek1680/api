const Lecturer = require('../models/Lecturer');

exports.createLecturer = async (req, res) => {
  try {
    const lecturer = new Lecturer(req.body);
    const savedLecturer = await lecturer.save();
    res.status(200).json(savedLecturer);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllLecturers = async (req, res) => {
  try {
    const lecturers = await Lecturer.find();
    res.render('lecturers', { lecturers });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getLecturer = async (req, res) => {
  try {
    const lecturer = await Lecturer.findById(req.params.id);
    res.status(200).json(lecturer);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateLecturer = async (req, res) => {
  try {
    const updatedLecturer = await Lecturer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedLecturer);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteLecturer = async (req, res) => {
  try {
    const removedLecturer = await Lecturer.findByIdAndRemove(
      req.params.id
    );
    res.status(200).json(removedLecturer);
  } catch (err) {
    res.status(500).json(err);
  }
};

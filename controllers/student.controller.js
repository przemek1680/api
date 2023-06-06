const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(200).json(savedStudent);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.render('students', { students });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const removedStudent = await Student.findByIdAndRemove(
      req.params.id
    );
    res.status(200).json(removedStudent);
  } catch (err) {
    res.status(500).json(err);
  }
};

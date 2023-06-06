const Course = require('../models/Course');

exports.courseAdd = async (req, res) => {
  const { name, department } = req.body;
  try {
    const course = new Course({ name: name, department: department });
    await course.save();
    res.redirect('/courses');
  } catch (error) {
    res.status(400).send('Error adding course');
  }
};

exports.courseList = async (req, res) => {
  try {
    const courses = await Course.find();
    res.render('courses', { courses });
  } catch (error) {
    res.status(400).send('Error retrieving courses');
  }
};

exports.courseEdit = async (req, res) => {
  const courseId = req.params.id;
  const { name, department } = req.body;

  try {
    await Course.findByIdAndUpdate(courseId, { name, department });
    res.redirect('/courses');
  } catch (error) {
    res.status(400).send('Error editing course');
  }
};
exports.courseEditPage = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send('Course not found');
    }
    res.render('course-edit', { course });
  } catch (error) {
    res.status(400).send('Error retrieving course');
  }
};

exports.courseDelete = async (req, res) => {
  console.log(req.params.id);
  const courseId = req.params.id;
  try {
    await Course.findByIdAndDelete(courseId);
    res.redirect('/courses');
  } catch (error) {
    res.status(400).send('Error deleting course');
  }
};

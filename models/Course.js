const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
});

module.exports = mongoose.model('Course', CourseSchema);

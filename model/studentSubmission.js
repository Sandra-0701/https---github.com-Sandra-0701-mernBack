const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  Name: String,
  Batch: String,
  Email: String,
  SubmissionLink: String,
  EvaluationStatus: { type: String, enum: ['completed', 'pending'], default: 'pending' },
  Marks: { type: Number, default: null },
  Comments: { type: String, default: null }

});

const Student = mongoose.model('Submission', studentSchema);

module.exports = Student;
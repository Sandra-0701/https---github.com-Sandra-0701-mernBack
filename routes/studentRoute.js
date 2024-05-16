// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../model/studentSubmission');

// Get all students
router.get('/submissions', async (req, res) => {
  try {   
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get submissions info by ID
router.get('/submissions/:id', async (req, res) => {
  try {
      const studentId = req.params.id;
      const student = await Student.findById(studentId);
      if (!student) {
          return res.status(404).json({ message: 'Mentor not found' });
      }
      res.status(200).json(student);
  } catch (error) {
      console.error('Error fetching mentor:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

// Add a new student



router.post('/newsubmission', async (req, res) => {
  try {
    const student = new Student({
      Name: req.body.Name,
      Batch: req.body.Batch,
      Email: req.body.Email,
      SubmissionLink: req.body.SubmissionLink
    });
      let submissionInfo = await Student(student).save();
      console.log(submissionInfo);
      res.status(200).send({ message: "Data added" });
  } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error adding data" });
  }
});

//delete submission

router.delete('/removesubmission/:id', async (req, res) => {
  try {
      const deletedSubmission = await Student.findByIdAndDelete(req.params.id);
      if (!deletedSubmission) {
          return res.status(404).json({ error: "Submission not found" });
      }
      res.json({ message: "Submission deleted successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
});

// POST route to update marks and comments for a student
router.post('/evaluation/:id', async (req, res) => {
  const { id } = req.params;
  const { Marks, Comments } = req.body;

  try {
    const student = await Student.findByIdAndUpdate(id, { Marks: Marks, Comments: Comments, EvaluationStatus: 'completed' }, { new: true });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Marks, comments, and evaluation status updated successfully' });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//Edit marks and comments

router.put('/editmarks/:id', async (req, res) => {
  const { id } = req.params;
  const {Marks, Comments } = req.body;

  try {
      const updatedEvaluation = await Student.findByIdAndUpdate(
          id,
          { Marks, Comments },
          { new: true }
      );

      if (!updatedEvaluation) {
          return res.status(404).json({ message: 'student not found' });
      }

      res.json({ message: 'Marks and Comments updated successfully', student: updatedEvaluation });
  } catch (error) {
      console.error('Error updating marks and comments:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});









module.exports = router;
const express = require('express');
const router = express.Router();
const Project = require('../model/project');

// Add new project topic
router.post('/topics', async (req, res) => {
  try {
    const { topic } = req.body;
    const newProjectTopic = await Project.create({ topic });
    res.status(201).json(newProjectTopic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all project topics
router.get('/topics', async (req, res) => {
  try {
    const topics = await Project.find();
    res.status(200).json(topics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete project topic by ID
router.delete('/topics/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: 'Project topic deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update project topic by ID
router.put('/topics/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { topic } = req.body;
    const updatedProjectTopic = await Project.findByIdAndUpdate(id, { topic }, { new: true });
    if (!updatedProjectTopic) {
      return res.status(404).json({ error: 'Project topic not found' });
    }
    res.status(200).json(updatedProjectTopic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

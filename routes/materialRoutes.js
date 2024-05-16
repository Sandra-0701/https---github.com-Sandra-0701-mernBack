const express = require('express');
const router = express.Router();
const ReferenceMaterial = require('../model/ReferenceMaterial');

// Add new reference material
router.post('/', async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const newReferenceMaterial = await ReferenceMaterial.create({ title, description, link });
    res.status(201).json(newReferenceMaterial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all reference materials
router.get('/', async (req, res) => {
  try {
    const referenceMaterials = await ReferenceMaterial.find();
    res.status(200).json(referenceMaterials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete reference material by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ReferenceMaterial.findByIdAndDelete(id);
    res.status(200).json({ message: 'Reference material deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
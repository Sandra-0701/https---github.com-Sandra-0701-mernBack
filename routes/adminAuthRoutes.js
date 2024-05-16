// routes/adminAuthRoutes.js

const express = require('express');
const router = express.Router();
const Admin = require('../model/Admin');

// Admin registration route
router.post('/register', async (req, res) => {
  const { Email, Password } = req.body;
  try {
    // Check if admin with the same email already exists
    const existingAdmin = await Admin.findOne({ Email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }
    // Create a new admin
    const newAdmin = new Admin({ Email, Password });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

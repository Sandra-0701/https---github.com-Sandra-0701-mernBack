const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../model/Admin');
const Mentor = require('../model/mentorModel');

const login = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    let user;

    // Check if the user is an admin
    user = await Admin.findOne({ Email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(Password, user.Password);
      if (isPasswordValid) {
        const token = jwt.sign({ role: 'Admin', userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ success: true, role: 'Admin', userId: user._id, token });
      }
    }

    // Check if the user is a mentor
    user = await Mentor.findOne({ Email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(Password, user.Password);
      if (isPasswordValid) {
        const token = jwt.sign({ role: 'Mentor', userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ success: true, role: 'Mentor', userId: user._id, token });
      }
    }

    res.status(401).json({ error: 'Invalid credentials', message: 'Invalid email or password' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', message: 'Internal Server Error' });
  }
};

module.exports = { login };

const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { login } = require('../controller/authController');

router.post('/login', login);

router.get('/protected', authenticate, (req, res) => {
  res.status(200).json({ message: 'This is a protected route!' });
});

module.exports = router;
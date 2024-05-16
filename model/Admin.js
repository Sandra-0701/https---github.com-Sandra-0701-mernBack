const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true }
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('Password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.Password, salt);
    this.Password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
adminSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.Password);
  } catch (error) {
    throw new Error(error);
  }
};

// Method to generate JWT token
adminSchema.methods.generateToken = function() {
  return jwt.sign({ adminId: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

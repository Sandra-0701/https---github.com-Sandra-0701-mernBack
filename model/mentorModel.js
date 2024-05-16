const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mentorSchema = new mongoose.Schema({
    Name: String,
    Email: { type: String, required: true, unique: true },
    PhoneNumber: Number,
    Password: { type: String, required: true },
    ProjectTopics: [String]
});

// Hash password before saving
mentorSchema.pre('save', async function(next) {
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
mentorSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.Password);
    } catch (error) {
        throw new Error(error);
    }
};

// Method to generate JWT token
mentorSchema.methods.generateToken = function() {
    return jwt.sign({ mentorId: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const Mentor = mongoose.model('Mentor', mentorSchema);
module.exports = Mentor;

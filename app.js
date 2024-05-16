// Importing
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoutes');
const referenceMaterialRouter = require('./routes/materialRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const authRoutes = require('./routes/authRoutes'); 
require('dotenv').config();
const mentorRoute = require('./routes/mentorRoutes');
const studentRoute = require('./routes/studentRoute');

// Initialization
const app = express();
const PORT = process.env.PORT || 3000;
require('./DB/connection');

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); // Ensure you can handle JSON requests

// Define Routes
app.use('/api', mentorRoute);
app.use('/api/project', projectRoutes);
app.use('/api/reference-material', referenceMaterialRouter);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoute);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the MERN Backend!');
});

// Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

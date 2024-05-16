//importing
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoutes');
const referenceMaterialRouter = require('./routes/materialRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const authRoutes = require('./routes/authRoutes'); 
require('dotenv').config()
const PORT = process.env.PORT;
require('./DB/connection')
const mentorRoute = require('./routes/mentorRoutes');
const studentRoute = require('./routes/studentRoute');

//initialisation
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use('/api', mentorRoute);
app.use('/api/project', projectRoutes);
app.use('/api/reference-material', referenceMaterialRouter);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoute);

//listen
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
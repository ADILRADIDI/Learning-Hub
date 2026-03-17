/**
 * Grading Service - Main Entry Point
 * 
 * Purpose: Manage grading and student performance analytics
 * 
 * Endpoints:
 *  POST   /grades                - Create grade
 *  GET    /grades/:submissionId  - Get grade
 *  PUT    /grades/:gradeId       - Update grade
 *  GET    /students/:userId/grades - Get student all grades
 *  GET    /courses/:courseId/grades - Get course grades report
 *  GET    /students/:userId/gpa - Get student GPA
 *  POST   /grades/bulk           - Bulk grade import
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'Grading Service',
    timestamp: new Date().toISOString()
  });
});

// TODO: Implement grading routes
// - POST /grades
// - GET /grades/:submissionId
// - PUT /grades/:gradeId
// - GET /students/:userId/grades
// - GET /courses/:courseId/grades
// - GET /students/:userId/gpa
// - GET /students/:userId/transcript
// - POST /grades/bulk
// - GET /reports/performance

// Error Handling
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    status: 404
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message,
    status: err.status || 500
  });
});

const server = app.listen(PORT, () => {
  console.log(`Grading Service running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Grading Service closed');
    process.exit(0);
  });
});

module.exports = app;

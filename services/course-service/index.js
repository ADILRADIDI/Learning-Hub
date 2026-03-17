/**
 * Course Service - Main Entry Point
 * 
 * Purpose: Manage courses, modules, and lessons
 * 
 * Endpoints:
 *  GET    /courses              - Get all courses
 *  GET    /courses/:id          - Get course by ID
 *  POST   /courses              - Create course
 *  PUT    /courses/:id          - Update course
 *  DELETE /courses/:id          - Delete course
 *  GET    /courses/:id/modules  - Get course modules
 *  POST   /courses/:id/modules  - Add module
 *  GET    /courses/:id/lessons  - Get course lessons
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3003;

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
    service: 'Course Service',
    timestamp: new Date().toISOString()
  });
});

// TODO: Implement course routes
// - GET /courses
// - GET /courses/:id
// - POST /courses
// - PUT /courses/:id
// - DELETE /courses/:id
// - GET /courses/:id/modules
// - POST /courses/:id/modules
// - GET /courses/:id/lessons
// - POST /courses/:id/lessons
// - POST /courses/:id/enroll

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
  console.log(`Course Service running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Course Service closed');
    process.exit(0);
  });
});

module.exports = app;

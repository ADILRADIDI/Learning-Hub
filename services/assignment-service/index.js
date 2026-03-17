/**
 * Assignment Service - Main Entry Point
 * 
 * Purpose: Manage assignments and student submissions
 * 
 * Endpoints:
 *  GET    /assignments              - Get all assignments
 *  GET    /assignments/:id          - Get assignment by ID
 *  POST   /assignments              - Create assignment
 *  PUT    /assignments/:id          - Update assignment
 *  DELETE /assignments/:id          - Delete assignment
 *  GET    /assignments/:id/submissions - Get submissions
 *  POST   /submissions              - Submit assignment
 *  GET    /submissions/:id          - Get submission
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3004;

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
    service: 'Assignment Service',
    timestamp: new Date().toISOString()
  });
});

// TODO: Implement assignment routes
// - GET /assignments
// - GET /assignments/:id
// - POST /assignments
// - PUT /assignments/:id
// - DELETE /assignments/:id
// - GET /assignments/:id/submissions
// - POST /submissions
// - GET /submissions/:id
// - PUT /submissions/:id

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
  console.log(`Assignment Service running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Assignment Service closed');
    process.exit(0);
  });
});

module.exports = app;

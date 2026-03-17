/**
 * User Service - Main Entry Point
 * 
 * Purpose: Manage user profiles and roles
 * 
 * Endpoints:
 *  GET    /users                - Get all users
 *  GET    /users/:id            - Get user by ID
 *  POST   /users                - Create user
 *  PUT    /users/:id            - Update user
 *  DELETE /users/:id            - Delete user
 *  GET    /users/:id/roles      - Get user roles
 *  PUT    /users/:id/roles      - Update user roles
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3002;

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
    service: 'User Service',
    timestamp: new Date().toISOString()
  });
});

// TODO: Implement user routes
// - GET /users
// - GET /users/:id
// - POST /users
// - PUT /users/:id
// - DELETE /users/:id
// - GET /users/:id/roles
// - PUT /users/:id/roles
// - GET /users/:id/profile
// - PUT /users/:id/profile

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
  console.log(`User Service running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('User Service closed');
    process.exit(0);
  });
});

module.exports = app;

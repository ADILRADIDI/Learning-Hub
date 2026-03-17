/**
 * Authentication Service - Main Entry Point
 * 
 * Purpose: Handle user authentication and JWT token management
 * 
 * Endpoints:
 *  POST   /auth/register  - User registration
 *  POST   /auth/login     - User login
 *  POST   /auth/refresh   - Refresh JWT token
 *  POST   /auth/logout    - User logout
 *  POST   /auth/verify    - Verify JWT token
 *  POST   /auth/password-reset - Reset password
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// Middleware Setup
// ============================================

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// ============================================
// Database Connection
// ============================================

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// ============================================
// Routes (To be implemented)
// ============================================

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'Auth Service',
    timestamp: new Date().toISOString()
  });
});

// TODO: Implement authentication routes
// - POST /auth/register
// - POST /auth/login
// - POST /auth/refresh
// - POST /auth/logout
// - POST /auth/verify
// - POST /auth/password-reset
// - POST /auth/password-change

// ============================================
// Error Handling
// ============================================

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

// ============================================
// Server Startup
// ============================================

const server = app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Auth Service closed');
    process.exit(0);
  });
});

module.exports = app;

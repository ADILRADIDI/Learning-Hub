/**
 * API Gateway - Main Entry Point
 * 
 * Purpose: Single entry point for all client requests
 * Routes requests to appropriate microservices
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// Middleware Setup
// ============================================

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: process.env.CORS_CREDENTIALS === 'true'
}));

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Logging Middleware
app.use(morgan('combined'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000 || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// ============================================
// Routes (To be implemented)
// ============================================

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: 'API Gateway'
  });
});

// API Documentation
app.get('/api-docs', (req, res) => {
  res.status(200).json({
    name: 'Learning Platform API',
    version: '1.0.0',
    description: 'Microservices-based Learning Management System',
    baseUrl: `http://localhost:${PORT}`,
    services: {
      auth: `${process.env.AUTH_SERVICE_URL}`,
      users: `${process.env.USER_SERVICE_URL}`,
      courses: `${process.env.COURSE_SERVICE_URL}`,
      assignments: `${process.env.ASSIGNMENT_SERVICE_URL}`,
      grading: `${process.env.GRADING_SERVICE_URL}`,
      communication: `${process.env.COMMUNICATION_SERVICE_URL}`
    }
  });
});

// TODO: Implement route handlers
// - Authentication routes
// - User management routes
// - Course management routes
// - Assignment routes
// - Grading routes
// - Communication routes

// ============================================
// Error Handling
// ============================================

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.path} not found`,
    status: 404
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    error: err.name || 'Internal Server Error',
    message: err.message,
    status: err.status || 500,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============================================
// Server Startup
// ============================================

const server = app.listen(PORT, () => {
  console.log(`
    ╔════════════════════════════════════════╗
    ║   Learning Platform API Gateway        ║
    ║   Running on port ${PORT}                  ║
    ║   Environment: ${process.env.NODE_ENV}       ║
    ╚════════════════════════════════════════╝
  `);
  
  console.log('Connected Services:');
  console.log(`  - Auth Service: ${process.env.AUTH_SERVICE_URL}`);
  console.log(`  - User Service: ${process.env.USER_SERVICE_URL}`);
  console.log(`  - Course Service: ${process.env.COURSE_SERVICE_URL}`);
  console.log(`  - Assignment Service: ${process.env.ASSIGNMENT_SERVICE_URL}`);
  console.log(`  - Grading Service: ${process.env.GRADING_SERVICE_URL}`);
  console.log(`  - Communication Service: ${process.env.COMMUNICATION_SERVICE_URL}`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

module.exports = app;

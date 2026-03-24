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
const axios = require('axios');
const jwt = require('jsonwebtoken');

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
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 1000,
  message: 'Too many requests from this IP, please try again later.',
  skip: (req) => process.env.NODE_ENV === 'development' // Disable in development
});
app.use('/api/', limiter);

// ============================================
// Service URLs
// ============================================

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';
const COURSE_SERVICE_URL = process.env.COURSE_SERVICE_URL || 'http://localhost:3002';
const ENROLLMENT_SERVICE_URL = process.env.ENROLLMENT_SERVICE_URL || 'http://localhost:3003';

// ============================================
// Helper Functions
// ============================================

const getForwardHeaders = (req) => {
  const headers = {
    Accept: req.headers.accept || 'application/json',
    'Content-Type': 'application/json'
  };

  if (req.headers.authorization) {
    headers.Authorization = req.headers.authorization;
  }

  // Forward user ID from JWT token
  if (req.user?.id) {
    headers['x-user-id'] = req.user.id;
  } else if (req.user?.userId) {
    headers['x-user-id'] = req.user.userId;
  }

  // Forward user role from JWT token
  if (req.user?.role) {
    headers['x-user-role'] = req.user.role;
  }

  return headers;
};

const proxyRequest = async (req, res, serviceBaseUrl, servicePath) => {
  try {
    const queryString = new URLSearchParams(req.query).toString();
    const targetUrl = `${serviceBaseUrl}${servicePath}${queryString ? `?${queryString}` : ''}`;

    const response = await axios({
      method: req.method,
      url: targetUrl,
      headers: getForwardHeaders(req),
      data: ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) ? req.body : undefined,
      timeout: 10000,
      validateStatus: () => true
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(502).json({
      error: 'Bad Gateway',
      message: `Service unavailable: ${serviceBaseUrl}`
    });
  }
};

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Missing token.' });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
  }
};

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
    description: 'Microservices-based Learning Platform (3 services)',
    baseUrl: `http://localhost:${PORT}`,
    services: {
      auth: `${process.env.AUTH_SERVICE_URL}`,
      courses: `${process.env.COURSE_SERVICE_URL}`,
      enrollments: `${process.env.ENROLLMENT_SERVICE_URL}`
    }
  });
});

// ============================================
// Auth Routes (public)
// ============================================

app.post('/api/auth/register', (req, res) => proxyRequest(req, res, AUTH_SERVICE_URL, '/auth/register'));
app.post('/api/auth/login', (req, res) => proxyRequest(req, res, AUTH_SERVICE_URL, '/auth/login'));
app.post('/api/auth/verify', (req, res) => proxyRequest(req, res, AUTH_SERVICE_URL, '/auth/verify'));
app.post('/api/auth/logout', (req, res) => proxyRequest(req, res, AUTH_SERVICE_URL, '/auth/logout'));

// ============================================
// Course Routes
// ============================================

app.get('/api/courses', (req, res) => proxyRequest(req, res, COURSE_SERVICE_URL, '/courses'));
app.get('/api/courses/:id', (req, res) => proxyRequest(req, res, COURSE_SERVICE_URL, `/courses/${req.params.id}`));
app.post('/api/courses', requireAuth, (req, res) => proxyRequest(req, res, COURSE_SERVICE_URL, '/courses'));

// ============================================
// Enrollment Routes
// ============================================

app.get('/api/enrollments/me', requireAuth, (req, res) => proxyRequest(req, res, ENROLLMENT_SERVICE_URL, '/enrollments/me'));
app.post('/api/enrollments', requireAuth, (req, res) => proxyRequest(req, res, ENROLLMENT_SERVICE_URL, '/enrollments'));
app.get('/api/enrollments/:id', requireAuth, (req, res) => proxyRequest(req, res, ENROLLMENT_SERVICE_URL, `/enrollments/${req.params.id}`));

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
  console.log(`  - Auth Service: ${AUTH_SERVICE_URL}`);
  console.log(`  - Course Service: ${COURSE_SERVICE_URL}`);
  console.log(`  - Enrollment Service: ${ENROLLMENT_SERVICE_URL}`);
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

/**
 * Communication Service - Main Entry Point
 * 
 * Purpose: Handle real-time messaging and notifications
 * 
 * Features:
 *  - WebSocket connections
 *  - Direct messaging
 *  - Announcements
 *  - Email notifications
 *  - In-app notifications
 * 
 * Endpoints:
 *  GET    /messages              - Get messages
 *  POST   /messages              - Send message
 *  GET    /notifications         - Get notifications
 *  POST   /notifications/mark    - Mark as read
 *  POST   /announcements         - Create announcement
 *  GET    /announcements/:courseId - Get course announcements
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
  }
});

const PORT = process.env.PORT || 3006;

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
    service: 'Communication Service',
    timestamp: new Date().toISOString()
  });
});

// WebSocket Connection Handler
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  // TODO: Implement WebSocket events
  // - join_room
  // - send_message
  // - typing
  // - notification
  // - disconnect

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// TODO: Implement communication routes
// - GET /messages
// - POST /messages
// - GET /notifications
// - POST /notifications/mark
// - POST /announcements
// - GET /announcements/:courseId
// - DELETE /messages/:messageId
// - GET /conversations
// - POST /conversations

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

server.listen(PORT, () => {
  console.log(`Communication Service running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Communication Service closed');
    process.exit(0);
  });
});

module.exports = { app, io };

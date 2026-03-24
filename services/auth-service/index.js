/**
 * Authentication Service - Main Entry Point
 * 
 * Purpose: Handle user authentication and JWT token management
 * Collections: users
 * 
 * Endpoints:
 *  POST   /auth/register  - User registration
 *  POST   /auth/login     - User login
 *  POST   /auth/verify    - Verify JWT token
 *  POST   /auth/logout    - User logout
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

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

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/learning-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// ============================================
// User Schema & Model
// ============================================

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: String,
  lastname: String,
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('users', userSchema);

// ============================================
// Validation Schemas
// ============================================

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstname: Joi.string(),
  lastname: Joi.string(),
  role: Joi.string().valid('student', 'admin').default('student')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// ============================================
// Helper Functions
// ============================================

const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
  } catch (error) {
    return null;
  }
};

// ============================================
// Routes
// ============================================

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'Auth Service',
    timestamp: new Date().toISOString()
  });
});

// Register
app.post('/auth/register', async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existingUser = await User.findOne({ 
      $or: [{ email: value.email }, { username: value.username }] 
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);

    const newUser = new User({
      username: value.username,
      email: value.email,
      password: hashedPassword,
      firstname: value.firstname,
      lastname: value.lastname,
      role: value.role
    });

    await newUser.save();

    const token = generateToken(newUser._id, newUser.role);

    res.status(201).json({
      message: 'User registered successfully',
      userId: newUser._id,
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post('/auth/login', async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await User.findOne({ email: value.email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(value.password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      message: 'Login successful',
      userId: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Token
app.post('/auth/verify', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    res.json({
      valid: true,
      userId: decoded.userId,
      role: decoded.role
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout
app.post('/auth/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

// ============================================
// Error Handling
// ============================================

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

// ============================================
// Start Server
// ============================================

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});

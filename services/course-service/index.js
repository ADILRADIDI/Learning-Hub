/**
 * Course Service - Main Entry Point
 * 
 * Purpose: Manage courses (CRUD operations)
 * Collections: courses
 * 
 * Endpoints:
 *  GET    /courses              - Get all courses
 *  GET    /courses/:id          - Get course by ID
 *  POST   /courses              - Create course
 *  PUT    /courses/:id          - Update course
 *  DELETE /courses/:id          - Delete course
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Joi = require('joi');

const app = express();
const PORT = process.env.PORT || 3002;

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
// Course Schema & Model
// ============================================

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  duration: {
    type: Number,
    default: 0
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  category: String,
  image: String,
  price: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  modules: {
    type: Number,
    default: 0
  },
  students: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
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

const Course = mongoose.model('courses', courseSchema);

// ============================================
// Validation Schemas
// ============================================

const courseSchema_Joi = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  instructor: Joi.string().required(),
  duration: Joi.number().default(0),
  level: Joi.string().valid('beginner', 'intermediate', 'advanced').default('beginner'),
  category: Joi.string(),
  image: Joi.string(),
  price: Joi.number().default(0),
  status: Joi.string().valid('draft', 'published', 'archived').default('draft'),
  modules: Joi.number().default(0)
});

// ============================================
// Routes
// ============================================

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'Course Service',
    timestamp: new Date().toISOString()
  });
});

// Get all courses
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({
      total: courses.length,
      courses
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get course by ID
app.get('/courses/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid course ID' });
    }

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create course
app.post('/courses', async (req, res) => {
  try {
    const { error, value } = courseSchema_Joi.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newCourse = new Course(value);
    await newCourse.save();

    res.status(201).json({
      message: 'Course created successfully',
      course: newCourse
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update course
app.put('/courses/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid course ID' });
    }

    const { error, value } = courseSchema_Joi.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    value.updatedAt = Date.now();

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({
      message: 'Course updated successfully',
      course: updatedCourse
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete course
app.delete('/courses/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid course ID' });
    }

    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({
      message: 'Course deleted successfully',
      course: deletedCourse
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
  console.log(`Course Service running on port ${PORT}`);
});

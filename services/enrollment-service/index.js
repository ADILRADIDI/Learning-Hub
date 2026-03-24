/**
 * Enrollment Service - Main Entry Point
 * 
 * Purpose: Manage student enrollments in courses
 * Collections: enrollment
 * 
 * Endpoints:
 *  POST   /enrollments              - Enroll student in course
 *  GET    /enrollments              - Get all enrollments
 *  GET    /enrollments/:id          - Get enrollment by ID
 *  GET    /enrollments/user/:userId - Get user enrollments
 *  DELETE /enrollments/:id          - Remove enrollment
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Joi = require('joi');

const app = express();
const PORT = process.env.PORT || 3003;

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
// Enrollment Schema & Model
// ============================================

const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'dropped'],
    default: 'active'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  completionDate: Date,
  grade: String,
  certificateIssued: {
    type: Boolean,
    default: false
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Enrollment = mongoose.model('enrollment', enrollmentSchema);

// ============================================
// Validation Schemas
// ============================================

const enrollmentSchema_Joi = Joi.object({
  course: Joi.string().required(),
  status: Joi.string().valid('active', 'completed', 'dropped').default('active')
});

const updateEnrollmentSchema = Joi.object({
  status: Joi.string().valid('active', 'completed', 'dropped'),
  progress: Joi.number().min(0).max(100),
  grade: Joi.string(),
  certificateIssued: Joi.boolean()
});

// ============================================
// Routes
// ============================================

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'Enrollment Service',
    timestamp: new Date().toISOString()
  });
});

// Get all enrollments
app.get('/enrollments', async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.json({
      total: enrollments.length,
      enrollments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current user enrollments (from gateway auth header)
app.get('/enrollments/me', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const enrollments = await Enrollment.find({ student: userId });

    res.json({
      total: enrollments.length,
      enrollments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get enrollments by user ID
app.get('/enrollments/user/:userId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const enrollments = await Enrollment.find({ student: req.params.userId });

    res.json({
      total: enrollments.length,
      enrollments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get enrollment by ID
app.get('/enrollments/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid enrollment ID' });
    }

    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create enrollment
app.post('/enrollments', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { error, value } = enrollmentSchema_Joi.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    value.student = userId;

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      student: value.student,
      course: value.course,
      status: 'active'
    });

    if (existingEnrollment) {
      return res.status(409).json({ error: 'Student already enrolled in this course' });
    }

    const newEnrollment = new Enrollment(value);
    await newEnrollment.save();

    res.status(201).json({
      message: 'Enrollment created successfully',
      enrollment: newEnrollment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update enrollment
app.put('/enrollments/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid enrollment ID' });
    }

    const { error, value } = updateEnrollmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    value.updatedAt = Date.now();

    if (value.status === 'completed' && !value.completionDate) {
      value.completionDate = Date.now();
    }

    const updatedEnrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true }
    );

    if (!updatedEnrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.json({
      message: 'Enrollment updated successfully',
      enrollment: updatedEnrollment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete enrollment
app.delete('/enrollments/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid enrollment ID' });
    }

    const deletedEnrollment = await Enrollment.findByIdAndDelete(req.params.id);

    if (!deletedEnrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.json({
      message: 'Enrollment deleted successfully',
      enrollment: deletedEnrollment
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
  console.log(`Enrollment Service running on port ${PORT}`);
});

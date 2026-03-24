/**
 * Seed Data Script
 * Populates MongoDB with test data for development
 * 
 * Run with: node seed-data.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://admin:admin123@localhost:27017/learning-platform?authSource=admin';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✓ MongoDB connected for seeding'))
  .catch(err => {
    console.error('✗ MongoDB connection error:', err);
    process.exit(1);
  });

// ============================================
// Define Schemas
// ============================================

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  firstname: String,
  lastname: String,
  role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, required: true },
  category: String,
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  duration: Number,
  students: [{ type: mongoose.Schema.Types.ObjectId }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, required: true },
  enrollmentDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'completed', 'dropped'], default: 'active' }
});

const User = mongoose.model('users', userSchema);
const Course = mongoose.model('courses', courseSchema);
const Enrollment = mongoose.model('enrollment', enrollmentSchema);

// ============================================
// Seed Data
// ============================================

const seedDatabase = async () => {
  try {
    // Clear existing data
    console.log('\n🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Course.deleteMany({});
    await Enrollment.deleteMany({});

    // Create test users
    console.log('📝 Creating test users...');
    
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = await User.insertMany([
      {
        username: 'student1',
        email: 'student1@example.com',
        password: hashedPassword,
        firstname: 'Ahmed',
        lastname: 'Hassan',
        role: 'student'
      },
      {
        username: 'student2',
        email: 'student2@example.com',
        password: hashedPassword,
        firstname: 'Fatima',
        lastname: 'Ali',
        role: 'student'
      },
      {
        username: 'instructor1',
        email: 'instructor1@example.com',
        password: hashedPassword,
        firstname: 'Dr. Mohamed',
        lastname: 'Ibrahim',
        role: 'instructor'
      },
      {
        username: 'instructor2',
        email: 'instructor2@example.com',
        password: hashedPassword,
        firstname: 'Dr. Layla',
        lastname: 'Ahmed',
        role: 'instructor'
      },
      {
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        firstname: 'Admin',
        lastname: 'User',
        role: 'admin'
      }
    ]);

    console.log(`✓ Created ${users.length} users`);

    // Create test courses
    console.log('📚 Creating test courses...');
    
    const courses = await Course.insertMany([
      {
        title: 'Introduction to JavaScript',
        description: 'Learn the fundamentals of JavaScript programming, including variables, functions, and DOM manipulation.',
        instructor: users[2]._id,
        category: 'Programming',
        level: 'beginner',
        duration: 30,
        students: [users[0]._id, users[1]._id]
      },
      {
        title: 'Advanced React Patterns',
        description: 'Master advanced React concepts including hooks, context API, and performance optimization.',
        instructor: users[2]._id,
        category: 'Programming',
        level: 'advanced',
        duration: 40,
        students: [users[0]._id]
      },
      {
        title: 'Web Design Fundamentals',
        description: 'Learn HTML, CSS, and responsive design principles for creating beautiful websites.',
        instructor: users[3]._id,
        category: 'Design',
        level: 'beginner',
        duration: 25,
        students: [users[1]._id, users[0]._id]
      },
      {
        title: 'Node.js Backend Development',
        description: 'Build scalable server-side applications using Node.js and Express.js.',
        instructor: users[3]._id,
        category: 'Programming',
        level: 'intermediate',
        duration: 35,
        students: [users[0]._id]
      },
      {
        title: 'Database Design with MongoDB',
        description: 'Master MongoDB and database design patterns for modern applications.',
        instructor: users[2]._id,
        category: 'Databases',
        level: 'intermediate',
        duration: 28,
        students: [users[1]._id]
      }
    ]);

    console.log(`✓ Created ${courses.length} courses`);

    // Create enrollments
    console.log('📋 Creating enrollments...');
    
    const enrollments = await Enrollment.insertMany([
      {
        student: users[0]._id,
        course: courses[0]._id,
        status: 'active'
      },
      {
        student: users[0]._id,
        course: courses[1]._id,
        status: 'active'
      },
      {
        student: users[0]._id,
        course: courses[3]._id,
        status: 'active'
      },
      {
        student: users[1]._id,
        course: courses[0]._id,
        status: 'active'
      },
      {
        student: users[1]._id,
        course: courses[2]._id,
        status: 'active'
      },
      {
        student: users[1]._id,
        course: courses[4]._id,
        status: 'active'
      }
    ]);

    console.log(`✓ Created ${enrollments.length} enrollments`);

    // Print test credentials
    console.log('\n' + '='.repeat(60));
    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log('\n📌 TEST CREDENTIALS:\n');
    console.log('Student Account:');
    console.log('  Username: student1');
    console.log('  Email: student1@example.com');
    console.log('  Password: password123\n');
    console.log('Instructor Account:');
    console.log('  Username: instructor1');
    console.log('  Email: instructor1@example.com');
    console.log('  Password: password123\n');
    console.log('Admin Account:');
    console.log('  Username: admin');
    console.log('  Email: admin@example.com');
    console.log('  Password: password123\n');
    console.log('='.repeat(60));
    console.log('\n📊 DATA SUMMARY:');
    console.log(`  • ${users.length} Users created`);
    console.log(`  • ${courses.length} Courses created`);
    console.log(`  • ${enrollments.length} Enrollments created\n`);

    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding
seedDatabase();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://admin:admin123@mongodb:27017/learning-platform?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  firstname: String,
  lastname: String,
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('users', userSchema);

(async () => {
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    await User.deleteMany({});
    
    const users = await User.insertMany([
      {username: "student1", email: "student1@example.com", password: hashedPassword, firstname: "Ahmed", lastname: "Hassan", role: "student"},
      {username: "student2", email: "student2@example.com", password: hashedPassword, firstname: "Fatima", lastname: "Ali", role: "student"},
      {username: "admin", email: "admin@example.com", password: hashedPassword, firstname: "Admin", lastname: "User", role: "admin"}
    ]);
    
    console.log("\n✅ USERS CREATED SUCCESSFULLY!\n");
    console.log("Student 1: student1 / password123");
    console.log("Student 2: student2 / password123");
    console.log("Admin: admin / password123\n");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
})();

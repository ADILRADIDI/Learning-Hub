use learning-platform;

// Create users
const hashedPassword = "$2a$10$N4dLx/3KFQdNhLrBSFKN7eACpPSXmDkn5f5NvkiF5yNfcJg6N5hPe"; // password123

db.users.deleteMany({});
db.courses.deleteMany({});
db.enrollment.deleteMany({});

const users = db.users.insertMany([
  {username: "student1", email: "student1@example.com", password: hashedPassword, firstname: "Ahmed", lastname: "Hassan", role: "student", createdAt: new Date()},
  {username: "student2", email: "student2@example.com", password: hashedPassword, firstname: "Fatima", lastname: "Ali", role: "student", createdAt: new Date()},
  {username: "instructor1", email: "instructor1@example.com", password: hashedPassword, firstname: "Dr. Mohamed", lastname: "Ibrahim", role: "instructor", createdAt: new Date()},
  {username: "instructor2", email: "instructor2@example.com", password: hashedPassword, firstname: "Dr. Layla", lastname: "Ahmed", role: "instructor", createdAt: new Date()},
  {username: "admin", email: "admin@example.com", password: hashedPassword, firstname: "Admin", lastname: "User", role: "admin", createdAt: new Date()}
]);

const userIds = db.users.find({}, {_id: 1}).toArray();

const courses = db.courses.insertMany([
  {title: "Introduction to JavaScript", description: "Learn JavaScript fundamentals", instructor: userIds[2]._id, category: "Programming", level: "beginner", duration: 30, students: [userIds[0]._id, userIds[1]._id], createdAt: new Date()},
  {title: "Advanced React Patterns", description: "Master advanced React concepts", instructor: userIds[2]._id, category: "Programming", level: "advanced", duration: 40, students: [userIds[0]._id], createdAt: new Date()},
  {title: "Web Design Fundamentals", description: "Learn HTML, CSS, and responsive design", instructor: userIds[3]._id, category: "Design", level: "beginner", duration: 25, students: [userIds[1]._id, userIds[0]._id], createdAt: new Date()},
  {title: "Node.js Backend Development", description: "Build scalable server-side applications", instructor: userIds[3]._id, category: "Programming", level: "intermediate", duration: 35, students: [userIds[0]._id], createdAt: new Date()},
  {title: "Database Design with MongoDB", description: "Master MongoDB and database design", instructor: userIds[2]._id, category: "Databases", level: "intermediate", duration: 28, students: [userIds[1]._id], createdAt: new Date()}
]);

const courseIds = db.courses.find({}, {_id: 1}).toArray();

db.enrollment.insertMany([
  {student: userIds[0]._id, course: courseIds[0]._id, status: "active", enrollmentDate: new Date()},
  {student: userIds[0]._id, course: courseIds[1]._id, status: "active", enrollmentDate: new Date()},
  {student: userIds[0]._id, course: courseIds[3]._id, status: "active", enrollmentDate: new Date()},
  {student: userIds[1]._id, course: courseIds[0]._id, status: "active", enrollmentDate: new Date()},
  {student: userIds[1]._id, course: courseIds[2]._id, status: "active", enrollmentDate: new Date()},
  {student: userIds[1]._id, course: courseIds[4]._id, status: "active", enrollmentDate: new Date()}
]);

print("\n" + "=".repeat(60));
print("✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!");
print("=".repeat(60));
print("\n📌 TEST CREDENTIALS:\n");
print("Student Account:");
print("  Username: student1");
print("  Email: student1@example.com");
print("  Password: password123\n");
print("Instructor Account:");
print("  Username: instructor1");
print("  Email: instructor1@example.com");
print("  Password: password123\n");
print("Admin Account:");
print("  Username: admin");
print("  Email: admin@example.com");
print("  Password: password123\n");
print("=".repeat(60));
print("\n📊 DATA SUMMARY:");
print("  • 5 Users created");
print("  • 5 Courses created");
print("  • 6 Enrollments created\n");

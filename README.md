# 🔧 Housam - Backend Developer

## Role
**Backend Developer - Microservices Architecture**

## Responsibilities
- Microservices development (Auth, Course, Enrollment)
- API Gateway setup and maintenance
- Database design and optimization
- Authentication & Authorization (JWT)
- API endpoint implementation
- Backend testing (unit & integration)
- Performance optimization

## Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB 7.0
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Joi
- **Password Hashing**: bcryptjs
- **Port Management**: 3000 (Gateway), 3001-3003 (Services)

## Microservices Architecture
```
Gateway (Port 3000/4000)
├── Auth Service (Port 3001)
│   ├── /auth/register
│   ├── /auth/login
│   ├── /auth/verify
│   └── /auth/logout
├── Course Service (Port 3002)
│   ├── GET /courses
│   ├── GET /courses/:id
│   ├── POST /courses
│   ├── PUT /courses/:id
│   └── DELETE /courses/:id
└── Enrollment Service (Port 3003)
    ├── GET /enrollments
    ├── GET /enrollments/me
    ├── GET /enrollments/user/:userId
    ├── POST /enrollments
    └── DELETE /enrollments/:id
```

## Directory Structure
```
housam-backend/
├── README.md (this file)
├── API_ENDPOINTS.md
├── DATABASE_SCHEMA.md
├── AUTHENTICATION_FLOW.md
├── SERVICES/
│   ├── auth-service.md
│   ├── course-service.md
│   └── enrollment-service.md
├── BUGS_FIXED/
│   └── log.md
├── PERFORMANCE/
│   ├── optimization_notes.md
│   └── benchmarks.md
└── DATABASE/
    ├── migrations/
    └── seeds/
```

## Environment Variables
```
Node.js Services:
- NODE_ENV=development
- PORT=3001 (auth), 3002 (course), 3003 (enrollment)
- JWT_SECRET=learning-hub-super-secret-key-2024-secure-production
- JWT_EXPIRE=24h
- MONGODB_URI=mongodb://admin:admin123@mongodb:27017/learning-platform?authSource=admin

Gateway:
- NODE_ENV=development
- PORT=3000
- JWT_SECRET=learning-hub-super-secret-key-2024-secure-production
- CORS_ORIGIN=*
- RATE_LIMIT_WINDOW=15
- RATE_LIMIT_MAX_REQUESTS=1000
```

## Database Collections

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String,
  email: String (unique),
  password: String (hashed),
  firstname: String,
  lastname: String,
  role: enum ['student', 'admin'],
  createdAt: Date,
  updatedAt: Date
}
```

### Courses Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  instructor: ObjectId (User),
  level: enum ['beginner', 'intermediate', 'advanced'],
  duration: Number (minutes),
  category: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Enrollments Collection
```javascript
{
  _id: ObjectId,
  student: ObjectId (User),
  course: ObjectId (Course),
  enrollmentDate: Date,
  status: enum ['active', 'completed', 'dropped'],
  progress: Number (0-100),
  completionDate: Date,
  grade: String,
  certificateIssued: Boolean,
  updatedAt: Date
}
```

## API Testing
```bash
# Test login endpoint
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student1@example.com","password":"password123"}'

# Get courses
curl http://localhost:4000/api/courses

# Get enrollments with auth
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:4000/api/enrollments/me
```

## Test Credentials
| Email | Password | Role |
|-------|----------|------|
| student1@example.com | password123 | student |
| student2@example.com | password123 | student |
| admin@example.com | password123 | admin |

## Security Checklist
- [x] JWT authentication implemented
- [x] Password hashing with bcryptjs
- [x] Rate limiting enabled
- [x] CORS configured
- [x] Request validation with Joi
- [x] Error handling for all endpoints
- [ ] Input sanitization
- [ ] SQL injection prevention (N/A - MongoDB)
- [ ] HTTPS enforcement (for production)
- [ ] API keys for external services

## Common Issues & Solutions
| Issue | Solution |
|-------|----------|
| JWT verification fails | Ensure JWT_SECRET matches across all services |
| MongoDB connection error | Check MONGODB_URI and credentials |
| CORS errors | Gateway CORS_ORIGIN should match frontend URL |
| 401 Unauthorized | Verify token is being forwarded in headers |
| Rate limit 429 | Increase RATE_LIMIT_MAX_REQUESTS in gateway |

## Development Commands
```bash
# Start all services (Docker)
docker-compose up -d --build

# Check service health
docker ps
docker logs learning-platform-auth

# Seed database
docker cp seed-users.js learning-platform-auth:/app/
docker exec learning-platform-auth node /app/seed-users.js

# Test endpoints
npm test
```

## Performance Optimization
- [ ] Index MongoDB collections
- [ ] Implement caching layer
- [ ] Add database query optimization
- [ ] API response compression
- [ ] Load testing

## Deployment Considerations
- Use environment variables for secrets
- Enable HTTPS in production
- Configure MONGODB_URI for production
- Update JWT_SECRET to strong value
- Set NODE_ENV=production
- Enable request logging

## Resources
- Node.js: https://nodejs.org
- Express.js: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- Mongoose: https://mongoosejs.com
- JWT: https://jwt.io

---
**Last Updated**: 2026-03-24
**Version**: 1.0
**Contact**: adil@learning-hub.com

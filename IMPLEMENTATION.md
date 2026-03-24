# Learning Platform - Complete Implementation Guide

## Overview
A **3-service microservices learning platform** with API Gateway, JWT authentication, MongoDB, and React + Tailwind CSS frontend.

## Architecture

```
┌─────────────────────────────────────────────┐
│   React Frontend (Tailwind CSS)             │
│   - Home, Login, Courses, MyEnrollments     │
└─────────────┬───────────────────────────────┘
              │ HTTP + JWT Bearer Token
       ┌──────▼──────────┐
       │  API Gateway    │ (Port 3000)
       │  - JWT Verify   │
       │  - Route Proxy  │
       └──┬────┬────┬────┘
          │    │    │
    ┌─────▼──┐ │ ┌─▼────────┐
    │Auth    │ │ │Enrollment│
    │Service │ │ │Service   │
    │(3001)  │ │ │(3003)    │
    └────┬───┘ │ └─┬────────┘
         │    ┌┴──▼────┐
         │    │Course   │
         │    │Service  │
         │    │(3002)   │
         │    └────┬────┘
         └─────────┼────────┘
                   │
            ┌──────▼──────┐
            │  MongoDB    │ (27017)
            │  - users    │
            │  - courses  │
            │  - enrollment │
            └─────────────┘
```

## Backend Components

### API Gateway (Port 3000)
- JWT verification middleware
- Request routing to services
- User context forwarding via headers
- Error handling & service proxy
- Rate limiting & CORS

### Auth Service (Port 3001)
- User registration with role selection
- Password hashing (bcryptjs)
- JWT token generation (24h)
- Token verification
- User storage in MongoDB

### Course Service (Port 3002)
- Create courses (instructors/admins only)
- List all courses (public)
- Get course details (public)
- Course metadata: level, duration, category

### Enrollment Service (Port 3003)
- Enroll students in courses
- View user's enrollments
- Prevent duplicate enrollments
- Track enrollment status

## Frontend Components

### Pages
- **Home** - Platform overview with Tailwind design
- **Login/Register** - Unified auth form with role selection
- **Courses** - Browse courses, create (instructors), enroll (students)
- **My Enrollments** - View enrolled courses

### Components
- **Navbar** - Auth-aware navigation with logout
- **CourseCard** - Course display with enroll button
- **EnrollmentList** - List user's enrollments

### Services
- **authService** - JWT management, login/register
- **courseService** - Course API integration
- **enrollmentService** - Enrollment API integration

## API Endpoints

### Public (No Auth)
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/courses
GET    /api/courses/:id
```

### Protected (Requires JWT)
```
POST   /api/courses          [Instructor/Admin only]
POST   /api/enrollments
GET    /api/enrollments/me
GET    /api/enrollments/:id
```

## Getting Started

### Start with Docker
```bash
docker-compose up -d
# Services run on localhost:3000
```

### Start Locally
```bash
# Terminal 1
docker-compose up

# Terminal 2
npm install
npm start
```

## Testing

### Register & Login
1. Go to http://localhost:3000
2. Register with email, password, username, role
3. Login with credentials
4. Token stored automatically in localStorage

### Create Course (Instructor)
1. Login as instructor
2. Go to /courses
3. Fill course form
4. Click "Créer le cours"

### Enroll (Student)
1. Login as student
2. Go to /courses
3. Click "S'inscrire" on course
4. Go to /my-enrollments

## Technology Stack

- **Frontend**: React 19, React Router 7, Axios, Tailwind CSS 3
- **Gateway**: Express.js, Axios, JWT
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB 7.0
- **Security**: bcryptjs, JWT, Helmet, CORS
- **Container**: Docker, Docker Compose

## Key Features

✅ JWT Authentication with token persistence
✅ Role-based access control (student/instructor/admin)
✅ Microservices architecture
✅ API Gateway pattern
✅ MongoDB integration
✅ Modern Tailwind CSS UI
✅ Responsive design
✅ Error handling
✅ Rate limiting
✅ Security headers

---

**Status**: Complete and ready for development

**Version**: 1.0.0

**Date**: March 24, 2026

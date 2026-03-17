# Project Structure Overview

## Complete Directory Tree

```
learning-platform-api/
│
├── docker/
│   ├── Dockerfile.service          # Template for microservices
│   └── Dockerfile.gateway          # API Gateway Dockerfile
│
├── gateway/                         # API Gateway Service
│   ├── index.js                    # Main entry point
│   └── package.json                # Dependencies
│
├── services/                        # Microservices
│   ├── auth-service/               # Authentication
│   │   ├── index.js
│   │   ├── package.json
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   │
│   ├── user-service/               # User Management
│   │   ├── index.js
│   │   ├── package.json
│   │   ├── models/
│   │   ├── routes/
│   │   └── controllers/
│   │
│   ├── course-service/             # Course Management
│   │   ├── index.js
│   │   ├── package.json
│   │   ├── models/
│   │   ├── routes/
│   │   └── controllers/
│   │
│   ├── assignment-service/         # Assignment Management
│   │   ├── index.js
│   │   ├── package.json
│   │   ├── models/
│   │   ├── routes/
│   │   └── controllers/
│   │
│   ├── grading-service/            # Grading & Analytics
│   │   ├── index.js
│   │   ├── package.json
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   │
│   └── communication-service/      # Real-time Communication
│       ├── index.js
│       ├── package.json
│       ├── models/
│       ├── routes/
│       └── websocket/
│
├── config/                          # Configuration files
│   ├── database.js                 # Database connection
│   ├── logger.js                   # Logging setup
│   └── constants.js                # Application constants
│
├── docs/                            # Documentation
│   ├── ARCHITECTURE.md             # System architecture
│   ├── GETTING_STARTED.md          # Setup guide
│   ├── PROJECT_STATUS.md           # Development status
│   └── API_DOCUMENTATION.md        # (To be created)
│
├── docker-compose.yml              # Docker Compose configuration
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
└── README.md                       # Project documentation with tickets

```

## Database Structure

### MongoDB Collections

```
learning-platform (Main Database)
├── auth-db
│   ├── users (authentication records)
│   ├── sessions (active sessions)
│   └── refresh_tokens
│
├── user-db
│   ├── profiles (user information)
│   ├── roles (user roles definition)
│   └── permissions (role permissions)
│
├── course-db
│   ├── courses (course information)
│   ├── modules (course modules)
│   ├── lessons (lesson content)
│   └── enrollments (student enrollments)
│
├── assignment-db
│   ├── assignments (assignment details)
│   └── submissions (student submissions)
│
├── grading-db
│   ├── grades (grade records)
│   └── grade_reports (analytics)
│
└── communication-db
    ├── messages (direct messages)
    ├── notifications (user notifications)
    └── announcements (course announcements)
```

## Service Dependencies

```
┌─────────────────────────────────────────────┐
│         Client Application                   │
└────────────────────┬────────────────────────┘
                     │
                     ▼
        ┌─────────────────────────┐
        │    API Gateway          │
        │  (Request Router)       │
        └────────┬────────────────┘
                 │
    ┌────────────┼────────────────┐
    │            │                │
    ▼            ▼                ▼
┌────────┐  ┌────────┐  ┌────────────────┐
│ Auth   │  │ User   │  │ Course + Other │
│Service │  │Service │  │   Services     │
└────────┘  └────────┘  └────────────────┘
    │            │              │
    └────────────┼──────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
    ┌────────┐      ┌──────────┐
    │MongoDB │      │  Redis   │
    │   DB   │      │ (Cache)  │
    └────────┘      └──────────┘
```

## API Endpoints Hierarchy

```
/api/
├── /auth
│   ├── POST /register
│   ├── POST /login
│   ├── POST /logout
│   ├── POST /refresh
│   ├── POST /verify
│   └── POST /password-reset
│
├── /users
│   ├── GET /
│   ├── GET /:id
│   ├── POST /
│   ├── PUT /:id
│   ├── DELETE /:id
│   ├── GET /:id/roles
│   ├── PUT /:id/roles
│   └── GET /:id/profile
│
├── /courses
│   ├── GET /
│   ├── GET /:id
│   ├── POST /
│   ├── PUT /:id
│   ├── DELETE /:id
│   ├── GET /:id/modules
│   ├── POST /:id/modules
│   ├── GET /:id/lessons
│   └── POST /:id/enroll
│
├── /assignments
│   ├── GET /
│   ├── GET /:id
│   ├── POST /
│   ├── PUT /:id
│   ├── DELETE /:id
│   ├── GET /:id/submissions
│   └── POST /submissions
│
├── /grades
│   ├── GET /
│   ├── POST /
│   ├── GET /:id
│   ├── PUT /:id
│   ├── GET /students/:userId/gpa
│   └── POST /bulk
│
└── /messages
    ├── GET /
    ├── POST /
    ├── GET /notifications
    ├── POST /announcements
    └── WebSocket Events
```

## Environment Variables

```
Gateway:
- GATEWAY_PORT=3000
- CORS_ORIGIN=*
- CORS_CREDENTIALS=true

Services:
- NODE_ENV=development
- PORT=3001-3006
- MONGODB_URI=mongodb://...
- REDIS_URL=redis://...

Security:
- JWT_SECRET=<secret>
- JWT_EXPIRE=24h
- JWT_REFRESH_SECRET=<secret>

External Services:
- EMAIL_SERVICE=gmail
- SMTP_HOST=smtp.gmail.com
- SMTP_PORT=587
```

## Docker Compose Services

| Service | Container | Port | Image | Purpose |
|---------|-----------|------|-------|---------|
| gateway | learning-platform-gateway | 3000 | custom | API Gateway |
| auth-service | learning-platform-auth | 3001 | custom | Auth Service |
| user-service | learning-platform-user | 3002 | custom | User Service |
| course-service | learning-platform-course | 3003 | custom | Course Service |
| assignment-service | learning-platform-assignment | 3004 | custom | Assignment Service |
| grading-service | learning-platform-grading | 3005 | custom | Grading Service |
| communication-service | learning-platform-communication | 3006 | custom | Communication Service |
| mongodb | learning-platform-mongodb | 27017 | mongo:latest | Database |
| redis | learning-platform-redis | 6379 | redis:latest | Cache |

## Development Tools

- **Node.js**: v18+
- **Package Manager**: npm
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Redis**: Caching & sessions
- **Socket.io**: Real-time communication
- **JWT**: Authentication
- **Joi**: Input validation
- **Docker**: Containerization
- **Jest**: Testing framework
- **ESLint**: Code linting
- **Prettier**: Code formatting

## Build & Deploy

```bash
# Build all services
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Run tests
docker-compose exec <service> npm test

# Format code
docker-compose exec <service> npm run format

# Stop services
docker-compose down

# Remove all volumes
docker-compose down -v
```

## Team Responsibilities

### Frontend Team
- Consume API endpoints
- WebSocket integration for real-time features
- Error handling
- User authentication flow

### Backend Team
- Implement microservices
- Database schema design
- API endpoint development
- Testing

### DevOps Team
- Docker & deployment
- CI/CD pipeline
- Monitoring & logging
- Database administration

### QA Team
- Test case creation
- Regression testing
- Performance testing
- Security testing

---

**Total Initialization Files Created**: 15+
**Services Ready**: 7 (All)
**Status**: ✅ Initialization Complete - Ready for Development

Last Updated: March 2026

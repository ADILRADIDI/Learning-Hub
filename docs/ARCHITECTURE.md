# Architecture Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT APPLICATION                       │
│                    (Web Browser / Mobile App)                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY (Port 3000)                     │
│  - Request Routing                                              │
│  - Authentication Middleware                                    │
│  - Rate Limiting                                                │
│  - CORS Handling                                                │
│  - Request/Response Logging                                     │
└────────────────────────┬────────────────────────────────────────┘
         │               │              │              │              │
         ▼               ▼              ▼              ▼              ▼
    ┌────────┐     ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐
    │  Auth  │     │  User  │    │ Course │    │ Assign │    │ Grading│
    │Service │     │Service │    │Service │    │ Service│    │Service │
    │(3001)  │     │(3002)  │    │(3003)  │    │(3004)  │    │(3005)  │
    └────────┘     └────────┘    └────────┘    └────────┘    └────────┘
         │               │              │              │              │
         └───────────────┴──────────────┴──────────────┴──────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
    ┌─────────┐   ┌──────────┐   ┌──────────┐
    │ MongoDB │   │  Redis   │   │ Communi- │
    │  (DB)   │   │(Caching) │   │cation S. │
    └─────────┘   └──────────┘   │(WebSocket)
                                 └──────────┘
```

## Service Descriptions

### 1. API Gateway (Port 3000)
**Purpose**: Single entry point for all client requests
- Request routing to appropriate microservices
- JWT token validation
- Rate limiting
- CORS policy enforcement
- Logging and monitoring
- Request/Response transformation

### 2. Authentication Service (Port 3001)
**Purpose**: User authentication and authorization
- User login/logout
- JWT token generation and validation
- OAuth integration (optional)
- Password reset functionality
- Session management

### 3. User Service (Port 3002)
**Purpose**: User profile and management
- User profile CRUD operations
- Role management (Admin, Teacher, Student)
- User permissions
- Profile picture upload
- User preferences

### 4. Course Service (Port 3003)
**Purpose**: Course creation and management
- Create/Read/Update/Delete courses
- Module management
- Lesson creation
- Content management
- Enroll users in courses
- Course catalog

### 5. Assignment Service (Port 3004)
**Purpose**: Assignment and homework management
- Create assignments
- Set due dates
- Student submissions
- Submission tracking
- Bulk operations

### 6. Grading Service (Port 3005)
**Purpose**: Grading and evaluation
- Grade submissions
- Calculate student grades
- Grade reports
- Performance analytics
- GPA calculation

### 7. Communication Service (Port 3006)
**Purpose**: Real-time messaging and notifications
- WebSocket connections
- Messaging between users
- Notifications
- Announcements
- Email notifications
- Notification preferences

## Database Schema

### MongoDB Collections

**auth-db**:
- users (authentication records)
- sessions (active sessions)
- refresh_tokens

**user-db**:
- profiles (user profiles)
- roles (user roles)
- permissions

**course-db**:
- courses (course information)
- modules (course modules)
- lessons (lesson content)
- enrollments

**assignment-db**:
- assignments (assignment details)
- submissions (student submissions)

**grading-db**:
- grades (grade records)
- grade_reports (grade analytics)

**communication-db**:
- messages (direct messages)
- notifications (user notifications)
- announcements (course announcements)

### Redis Keys

```
session:{sessionId}           - Active sessions
user:{userId}:profile         - Cached user profiles
course:{courseId}:data        - Cached course data
assignments:{userId}          - User assignments cache
notifications:{userId}        - User notifications queue
rate_limit:{ip}               - Rate limiting data
```

## Deployment Architecture

```
┌──────────────────────────────────────┐
│      Docker Compose Environment      │
│  (Development & Testing)             │
└──────────────────────────────────────┘
         │
         ├─ Gateway Container
         ├─ Auth Service Container
         ├─ User Service Container
         ├─ Course Service Container
         ├─ Assignment Service Container
         ├─ Grading Service Container
         ├─ Communication Service Container
         ├─ MongoDB Container
         └─ Redis Container
```

## Communication Patterns

### Synchronous Communication (HTTP/REST)
- Gateway → Services (request/response)
- Service-to-Service calls when needed
- External API integrations

### Asynchronous Communication
- Redis Queue for background jobs
- Event-driven architecture (future enhancement)
- WebSocket for real-time features

## Security Measures

1. **Authentication**: JWT-based authentication
2. **Authorization**: Role-based access control (RBAC)
3. **Encryption**: HTTPS/TLS for transport
4. **Database**: MongoDB authentication with username/password
5. **Input Validation**: All inputs validated at gateway and service level
6. **Rate Limiting**: Prevent abuse and DDoS attacks
7. **CORS**: Controlled cross-origin requests
8. **Environment Variables**: Sensitive data managed via .env

## Scaling Considerations

### Horizontal Scaling
- Each service can be scaled independently
- Load balancer in front of gateway
- Database replication for MongoDB
- Redis cluster setup

### Vertical Scaling
- Increase container resource limits
- Database indexing optimization
- Caching strategy optimization

## Development Workflow

1. **Local Development**
   - Use docker-compose for local environment
   - Services run in separate containers
   - Hot-reload enabled via volume mounts

2. **Testing**
   - Unit tests per service
   - Integration tests for service communication
   - E2E tests through API Gateway

3. **Staging**
   - Mirror of production setup
   - Full integration testing
   - Performance testing

4. **Production**
   - Kubernetes deployment (optional)
   - CI/CD pipeline (GitHub Actions)
   - Monitoring and alerting

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js v18+ |
| Web Framework | Express.js |
| API Gateway | Express + Middleware |
| Database | MongoDB |
| Caching | Redis |
| Real-time | Socket.io |
| Testing | Jest, Mocha |
| Container | Docker, Docker Compose |
| CI/CD | GitHub Actions |

## Environment Variables Management

```
.env.example          - Template with all required variables
.env.development      - Development environment
.env.staging          - Staging environment
.env.production       - Production environment (secured)
```

## Monitoring & Logging

- **Logs**: Centralized logging to stdout (Docker compatible)
- **Health Checks**: Endpoint `/health` for each service
- **Metrics**: (Future: Prometheus integration)
- **Tracing**: (Future: Jaeger/OpenTelemetry integration)

## Error Handling

- Consistent error response format across all services
- Error codes and messages standardized
- Stack traces logged but not exposed to clients
- Graceful degradation when services are unavailable

---

**Last Updated**: March 2026

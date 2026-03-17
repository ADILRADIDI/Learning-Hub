# Learning Platform - Microservices Architecture

## Description

Plateforme de gestion de cours avec trois microservices Node.js essentiels.

## Architecture

```
Gateway (3000) -> Auth (3001), Course (3002), Enrollment (3003) -> MongoDB
```

## Services

### Auth Service (3001)
- Collection: users
- Register, Login, Verify JWT, Logout

### Course Service (3002)
- Collection: courses
- CRUD operations for courses

### Enrollment Service (3003)
- Collection: enrollment
- Student enrollments and progress tracking

## Quick Start

```bash
docker-compose up -d
curl http://localhost:3000/health
```

## Project Structure

```
HSM-z-s-cloud/
├── services/
│   ├── auth-service/
│   ├── course-service/
│   └── enrollment-service/
├── gateway/
├── docker/
│   ├── Dockerfile.gateway
│   └── Dockerfile.service
├── docker-compose.yml
└── .env.example
```

## Technology Stack

- Node.js 18+
- Express.js
- MongoDB
- Docker & Docker Compose

---

**Version**: 1.0.0 | **Updated**: March 17, 2026

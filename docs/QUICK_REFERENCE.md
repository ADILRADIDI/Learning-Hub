# Quick Reference Guide

## 🚀 Start Development in 5 Minutes

```bash
# 1. Clone/Navigate to project
cd learning-platform-api

# 2. Start all services
docker-compose up -d

# 3. Check if all services are running
docker-compose ps

# 4. Install dependencies (if first time)
for service in gateway auth-service user-service course-service assignment-service grading-service communication-service; do
  docker-compose exec $service npm install
done

# 5. Access services
echo "✅ Gateway: http://localhost:3000/health"
echo "✅ Auth: http://localhost:3001/health"
echo "✅ Users: http://localhost:3002/health"
echo "✅ Courses: http://localhost:3003/health"
echo "✅ Assignments: http://localhost:3004/health"
echo "✅ Grading: http://localhost:3005/health"
echo "✅ Communication: http://localhost:3006/health"
```

## 📁 Key Files & Directories

| File/Directory | Purpose |
|---|---|
| `docker-compose.yml` | Service orchestration |
| `.env.example` | Environment template |
| `docs/ARCHITECTURE.md` | System design |
| `docs/GETTING_STARTED.md` | Setup guide |
| `docs/PROJECT_STATUS.md` | Development status |
| `gateway/index.js` | API Gateway entry |
| `services/*/index.js` | Service entry points |
| `README.md` | Project overview & tickets |

## 🔧 Common Commands

### Docker Operations
```bash
# Start in background
docker-compose up -d

# Start in foreground (see logs)
docker-compose up

# Stop all services
docker-compose down

# Remove everything including data
docker-compose down -v

# View logs
docker-compose logs -f [service-name]

# Rebuild images
docker-compose build
```

### Service Operations
```bash
# Run command in service
docker-compose exec [service-name] [command]

# Install packages
docker-compose exec [service-name] npm install [package]

# Run tests
docker-compose exec [service-name] npm test

# Format code
docker-compose exec [service-name] npm run format

# Lint code
docker-compose exec [service-name] npm run lint
```

### Database Access
```bash
# MongoDB shell
docker-compose exec mongodb mongosh -u admin -p password

# Redis CLI
docker-compose exec redis redis-cli

# View MongoDB
# > use learning-platform
# > db.users.find()
```

## 📋 Implementation Checklist

### Before Starting Development
- [ ] Read ARCHITECTURE.md
- [ ] Read GETTING_STARTED.md
- [ ] Copy .env.example to .env
- [ ] Run `docker-compose up -d`
- [ ] Verify all services are running

### For Each Service
- [ ] Create database models (MongoDB schemas)
- [ ] Implement route handlers
- [ ] Add input validation (Joi)
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Add API documentation
- [ ] Code review & cleanup

## 🏗️ Service Breakdown

### Gateway (Port 3000)
- Request routing
- Authentication middleware
- Rate limiting
- CORS handling

### Auth Service (Port 3001)
- User registration
- Login/Logout
- JWT management
- Password reset

### User Service (Port 3002)
- Profile management
- Role assignment
- User permissions

### Course Service (Port 3003)
- Create/Read/Update courses
- Module management
- Student enrollment

### Assignment Service (Port 3004)
- Create assignments
- Student submissions
- Deadline tracking

### Grading Service (Port 3005)
- Grade assignments
- GPA calculation
- Performance reports

### Communication Service (Port 3006)
- Real-time messaging
- Notifications
- Announcements

## 🗂️ Project Structure

```
├── gateway/              ← API Gateway
├── services/             ← 6 Microservices
│   ├── auth-service/
│   ├── user-service/
│   ├── course-service/
│   ├── assignment-service/
│   ├── grading-service/
│   └── communication-service/
├── docker/              ← Docker configs
├── config/              ← App configs
├── docs/                ← Documentation
├── docker-compose.yml   ← Container setup
├── .env.example         ← Environment vars
├── README.md            ← Project overview
└── .gitignore           ← Git ignore rules
```

## 🔒 Security Notes

- Change JWT secrets before production
- Update MongoDB credentials
- Use HTTPS in production
- Implement rate limiting
- Validate all inputs
- Add authentication middleware
- Secure environment variables

## 📚 Documentation Files

| File | Content |
|------|---------|
| README.md | Project overview & 20 tickets |
| ARCHITECTURE.md | System design & diagrams |
| GETTING_STARTED.md | Setup & development guide |
| PROJECT_STATUS.md | Development checklist |
| PROJECT_STRUCTURE.md | Directory structure |
| QUICK_REFERENCE.md | This file |

## 🧪 Testing

```bash
# Run tests for a service
docker-compose exec [service] npm test

# Run with coverage
docker-compose exec [service] npm test -- --coverage

# Run in watch mode
docker-compose exec [service] npm test -- --watch
```

## 📊 Database Collections

### auth-db
- users, sessions, refresh_tokens

### user-db
- profiles, roles, permissions

### course-db
- courses, modules, lessons, enrollments

### assignment-db
- assignments, submissions

### grading-db
- grades, grade_reports

### communication-db
- messages, notifications, announcements

## 🚦 Health Checks

```bash
# Check all services
curl http://localhost:3000/health   # Gateway
curl http://localhost:3001/health   # Auth
curl http://localhost:3002/health   # Users
curl http://localhost:3003/health   # Courses
curl http://localhost:3004/health   # Assignments
curl http://localhost:3005/health   # Grading
curl http://localhost:3006/health   # Communication
```

## 🔄 Development Workflow

1. **Create branch**: `git checkout -b feature/service-name`
2. **Implement service**: Add routes, models, controllers
3. **Write tests**: Unit & integration tests
4. **Code review**: Create PR for review
5. **Merge**: Merge to main after approval
6. **Deploy**: Redeploy with docker-compose up

## 📞 Support

- Check documentation in `docs/` folder
- Review GitHub Issues
- Check docker-compose logs
- Test endpoints with curl or Postman

## ⚡ Quick Problem Solving

**Port already in use?**
```bash
lsof -i :3000
kill -9 [PID]
```

**MongoDB won't connect?**
```bash
docker-compose exec mongodb mongosh -u admin -p password
# Check if collections exist
```

**Service keeps crashing?**
```bash
docker-compose logs -f [service-name]
# Check for errors in logs
```

**Need fresh start?**
```bash
docker-compose down -v
docker-compose build
docker-compose up -d
```

---

**Quick Tip**: Always check the logs first!
```bash
docker-compose logs -f [service-name]
```

Last Updated: March 2026

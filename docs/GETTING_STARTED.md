# Getting Started Guide

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Node.js v18+ (for local development)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learning-platform-api
   ```

2. **Copy environment file**
   ```bash
   cp .env.example .env
   ```

3. **Start all services with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Verify services are running**
   ```bash
   docker-compose ps
   ```

5. **Access the API**
   - Gateway: http://localhost:3000
   - API Documentation: http://localhost:3000/api-docs

### Stop Services
```bash
docker-compose down
```

## Service Ports

| Service | Port | Health Check |
|---------|------|--------------|
| API Gateway | 3000 | http://localhost:3000/health |
| Auth Service | 3001 | http://localhost:3001/health |
| User Service | 3002 | http://localhost:3002/health |
| Course Service | 3003 | http://localhost:3003/health |
| Assignment Service | 3004 | http://localhost:3004/health |
| Grading Service | 3005 | http://localhost:3005/health |
| Communication Service | 3006 | http://localhost:3006/health |
| MongoDB | 27017 | - |
| Redis | 6379 | - |

## Development Workflow

### Working with Individual Services

```bash
# Terminal 1 - Start all services
docker-compose up

# Terminal 2 - Install dependencies in a service
docker-compose exec auth-service npm install

# Terminal 3 - Run tests
docker-compose exec auth-service npm test

# View logs for a specific service
docker-compose logs -f auth-service
```

### Database Access

#### MongoDB
```bash
# Access MongoDB shell
docker-compose exec mongodb mongosh -u admin -p password

# List databases
show dbs

# Use learning-platform database
use learning-platform
```

#### Redis
```bash
# Access Redis CLI
docker-compose exec redis redis-cli

# Get all keys
keys *

# Get value
get <key>
```

## File Structure

```
learning-platform-api/
├── gateway/                      # API Gateway service
│   ├── index.js
│   └── package.json
├── services/
│   ├── auth-service/            # Authentication microservice
│   ├── user-service/            # User management microservice
│   ├── course-service/          # Course management microservice
│   ├── assignment-service/      # Assignment management microservice
│   ├── grading-service/         # Grading microservice
│   └── communication-service/   # Real-time communication microservice
├── docker/                       # Docker configuration
│   ├── Dockerfile.service       # Service template Dockerfile
│   └── Dockerfile.gateway       # Gateway Dockerfile
├── config/                       # Configuration files
├── docs/                         # Documentation
│   └── ARCHITECTURE.md          # System architecture
├── docker-compose.yml           # Docker Compose configuration
├── .env.example                 # Environment variables template
└── README.md                    # Project documentation
```

## Common Commands

### Docker Compose
```bash
# Start services (background)
docker-compose up -d

# Start services (foreground)
docker-compose up

# Stop all services
docker-compose down

# Remove all data (including volumes)
docker-compose down -v

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f <service-name>

# Execute command in service
docker-compose exec <service-name> <command>

# Rebuild images
docker-compose build
```

### Service Development
```bash
# Install dependencies
docker-compose exec <service-name> npm install

# Run tests
docker-compose exec <service-name> npm test

# Run linting
docker-compose exec <service-name> npm run lint

# Format code
docker-compose exec <service-name> npm run format
```

## Testing Endpoints

### Using curl
```bash
# Check gateway health
curl http://localhost:3000/health

# Check auth service health
curl http://localhost:3001/health

# Get API documentation
curl http://localhost:3000/api-docs
```

### Using Postman
1. Import the collection (to be created)
2. Set environment variables
3. Run requests

## Troubleshooting

### Port already in use
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Docker connection issues
```bash
# Check Docker daemon
docker ps

# Check network
docker network ls

# Rebuild and restart
docker-compose down -v
docker-compose build
docker-compose up -d
```

### MongoDB connection issues
```bash
# Check MongoDB logs
docker-compose logs mongodb

# Test connection
docker-compose exec mongodb mongosh -u admin -p password
```

## Next Steps

1. **Implement services** - Start with auth service, then others
2. **Add route handlers** - Implement endpoints in each service
3. **Create models** - MongoDB schemas for each service
4. **Add validation** - Input validation using Joi
5. **Write tests** - Unit and integration tests
6. **API documentation** - Swagger/OpenAPI docs
7. **Deploy** - Configure CI/CD pipeline

## Additional Resources

- [Architecture Documentation](./docs/ARCHITECTURE.md)
- [README](./README.md)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Docker Documentation](https://docs.docker.com/)
- [Socket.io Documentation](https://socket.io/docs/)

---

**Last Updated**: March 2026

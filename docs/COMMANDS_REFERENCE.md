#!/bin/bash

# Learning Platform API - Quick Commands Reference
# Use this file as a command reference for common operations

# ============================================
# DOCKER COMPOSE COMMANDS
# ============================================

# Start all services in background
# docker-compose up -d

# Start all services in foreground (see logs)
# docker-compose up

# Stop all services
# docker-compose down

# Stop all services and remove volumes (careful!)
# docker-compose down -v

# View status of all services
# docker-compose ps

# View logs from all services
# docker-compose logs -f

# View logs from specific service
# docker-compose logs -f [service-name]

# Rebuild all images
# docker-compose build

# Rebuild specific service
# docker-compose build [service-name]

# ============================================
# SERVICE COMMANDS
# ============================================

# Execute command in a service
# docker-compose exec [service-name] [command]

# Install packages in service
# docker-compose exec [service-name] npm install

# Run tests
# docker-compose exec [service-name] npm test

# Run linting
# docker-compose exec [service-name] npm run lint

# Format code
# docker-compose exec [service-name] npm run format

# Start service in development mode
# docker-compose exec [service-name] npm run dev

# ============================================
# DATABASE COMMANDS
# ============================================

# Access MongoDB shell
# docker-compose exec mongodb mongosh -u admin -p password

# MongoDB queries:
# > show dbs
# > use learning-platform
# > show collections
# > db.users.find()
# > db.users.find({}).limit(5)

# Access Redis CLI
# docker-compose exec redis redis-cli

# Redis commands:
# > keys *
# > get [key]
# > set [key] [value]
# > del [key]
# > flushall (clears all data)

# ============================================
# HEALTH CHECKS
# ============================================

# Check gateway
# curl http://localhost:3000/health

# Check auth service
# curl http://localhost:3001/health

# Check user service
# curl http://localhost:3002/health

# Check course service
# curl http://localhost:3003/health

# Check assignment service
# curl http://localhost:3004/health

# Check grading service
# curl http://localhost:3005/health

# Check communication service
# curl http://localhost:3006/health

# ============================================
# COMMON WORKFLOWS
# ============================================

# 1. Fresh Start
# docker-compose down -v
# docker-compose build
# docker-compose up -d

# 2. Check Everything
# docker-compose ps
# curl http://localhost:3000/health

# 3. Install Dependencies
# for service in gateway auth-service user-service course-service assignment-service grading-service communication-service; do
#   docker-compose exec $service npm install
# done

# 4. Run All Tests
# for service in gateway auth-service user-service course-service assignment-service grading-service communication-service; do
#   docker-compose exec $service npm test
# done

# 5. Format All Code
# for service in gateway auth-service user-service course-service assignment-service grading-service communication-service; do
#   docker-compose exec $service npm run format
# done

# ============================================
# SERVICE NAMES FOR REFERENCE
# ============================================

# gateway - API Gateway (port 3000)
# auth-service - Authentication Service (port 3001)
# user-service - User Management Service (port 3002)
# course-service - Course Management Service (port 3003)
# assignment-service - Assignment Management Service (port 3004)
# grading-service - Grading Service (port 3005)
# communication-service - Communication Service (port 3006)
# mongodb - MongoDB Database (port 27017)
# redis - Redis Cache (port 6379)

# ============================================
# TROUBLESHOOTING
# ============================================

# Port in use?
# lsof -i :[PORT]
# kill -9 [PID]

# Docker not responding?
# docker-compose restart

# Services not healthy?
# docker-compose logs -f

# Need clean slate?
# docker-compose down -v
# docker system prune

# ============================================
# DOCUMENTATION REFERENCES
# ============================================

# Main README
# See: ../README.md

# Getting Started Guide
# See: GETTING_STARTED.md

# Architecture Documentation
# See: ARCHITECTURE.md

# Project Status & Checklist
# See: PROJECT_STATUS.md

# Project Structure Overview
# See: PROJECT_STRUCTURE.md

# Quick Reference
# See: QUICK_REFERENCE.md

# ============================================
# ENVIRONMENT SETUP
# ============================================

# Copy environment template
# cp .env.example .env

# Edit environment file
# nano .env (or your preferred editor)

# Key variables to update:
# - JWT_SECRET (change to a strong key)
# - MONGODB credentials (if using external DB)
# - REDIS_URL (if using external Redis)
# - EMAIL settings (for notifications)

# ============================================
# GIT WORKFLOW
# ============================================

# Create feature branch
# git checkout -b feature/[feature-name]

# Stage changes
# git add .

# Commit changes
# git commit -m "feat: [description]"

# Push to remote
# git push origin feature/[feature-name]

# Create pull request on GitHub

# ============================================
# TESTING & QUALITY
# ============================================

# Run tests with coverage
# docker-compose exec [service] npm test -- --coverage

# Run tests in watch mode
# docker-compose exec [service] npm test -- --watch

# Run linting with fixes
# docker-compose exec [service] npm run lint:fix

# Check code quality
# docker-compose exec [service] npm run lint

# ============================================
# DEVELOPMENT WORKFLOW
# ============================================

# 1. Terminal 1: Start services
# docker-compose up

# 2. Terminal 2: View logs
# docker-compose logs -f [service-name]

# 3. Terminal 3: Edit code
# Your editor here

# 4. Terminal 4: Run tests
# docker-compose exec [service] npm test

# Services will auto-reload with nodemon in dev mode

# ============================================
# QUICK COMMAND ALIASES (Optional)
# ============================================

# Add to your ~/.zshrc or ~/.bashrc:
# alias dc='docker-compose'
# alias dcup='docker-compose up -d'
# alias dcdown='docker-compose down'
# alias dclogs='docker-compose logs -f'
# alias dcexec='docker-compose exec'
# alias dcps='docker-compose ps'

# Then use:
# dc up -d
# dcps
# dclogs

# ============================================
# TIPS & BEST PRACTICES
# ============================================

# 1. Always check logs first for errors
#    docker-compose logs -f [service-name]

# 2. Use health check endpoints to verify
#    curl http://localhost:PORT/health

# 3. Keep .env file secure - don't commit
#    It's in .gitignore for a reason

# 4. Use docker-compose for consistency
#    Ensures same environment for all devs

# 5. Format code before committing
#    docker-compose exec [service] npm run format

# 6. Write tests as you code
#    Better coverage = fewer bugs

# 7. Document your changes
#    Update README if API changes

# ============================================
# API TESTING EXAMPLES
# ============================================

# Test Gateway Health
# curl -X GET http://localhost:3000/health

# Test API Documentation
# curl -X GET http://localhost:3000/api-docs

# Example POST request (will fail until routes implemented)
# curl -X POST http://localhost:3001/auth/login \
#   -H "Content-Type: application/json" \
#   -d '{"email":"user@example.com","password":"password123"}'

# ============================================

# For more information, see the documentation files:
# - GETTING_STARTED.md
# - QUICK_REFERENCE.md
# - ARCHITECTURE.md

# Last Updated: March 2026

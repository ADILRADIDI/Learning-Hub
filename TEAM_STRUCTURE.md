# 🚀 Learning Hub - Team Project Structure

## Team Members & Roles

| Name | Role | Directory | Responsibility |
|------|------|-----------|-----------------|
| **Adil** | Project Manager | `team/adil-pm/` | Project oversight, coordination, documentation |
| **Samah** | Frontend Developer | `team/samah-frontend/` | React UI/UX, Components, Styling |
| **Housam** | Backend Developer | `team/housam-backend/` | Microservices, APIs, Database |
| **Zouhair** | Documentation & QA | `team/zouhair-docs/` | Documentation, Debugging, Monitoring |

---

## Project Structure

```
HSM-z-s-cloud/
│
├── team/                           # Team collaboration directory
│   ├── adil-pm/                   # Adil - Project Manager
│   │   ├── README.md              # Role & responsibilities
│   │   ├── ROADMAP.md             # Project timeline & milestones
│   │   ├── TEAM_MEETINGS/         # Meeting notes
│   │   ├── DECISIONS/             # Architecture decisions
│   │   ├── QA_TESTING/            # Testing plans & results
│   │   └── DEPLOYMENT/            # Deployment guides
│   │
│   ├── samah-frontend/            # Samah - Frontend Developer
│   │   ├── README.md              # Role & responsibilities
│   │   ├── COMPONENTS.md          # Component list
│   │   ├── PAGES.md               # Pages list
│   │   ├── STYLING_GUIDE.md       # CSS/Tailwind guidelines
│   │   ├── TESTING_CHECKLIST.md   # Frontend tests
│   │   ├── FEATURES/              # Feature status tracking
│   │   └── BUGS_FIXED/            # Fixed bugs log
│   │
│   ├── housam-backend/            # Housam - Backend Developer
│   │   ├── README.md              # Role & responsibilities
│   │   ├── API_ENDPOINTS.md       # All endpoints
│   │   ├── DATABASE_SCHEMA.md     # Database design
│   │   ├── AUTHENTICATION_FLOW.md # Auth process
│   │   ├── SERVICES/              # Service documentation
│   │   ├── BUGS_FIXED/            # Fixed bugs log
│   │   ├── PERFORMANCE/           # Performance notes
│   │   └── DATABASE/              # Migrations & seeds
│   │
│   └── zouhair-docs/              # Zouhair - Docs & QA
│       ├── README.md              # Role & responsibilities
│       ├── API_DOCUMENTATION/     # API docs & Postman
│       ├── ARCHITECTURE/          # System design
│       ├── DEBUGGING/             # Bug tracker & logs
│       ├── GUIDES/                # User & dev guides
│       ├── MONITORING/            # Health & performance
│       └── CHANGELOG.md           # Project changelog
│
├── src/                           # React Frontend (Samah maintains)
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.js
│
├── services/                      # Microservices (Housam maintains)
│   ├── auth-service/
│   ├── course-service/
│   └── enrollment-service/
│
├── gateway/                       # API Gateway (Housam maintains)
│   └── index.js
│
├── docker/                        # Docker config (Housam maintains)
├── docker-compose.yml             # Orchestration
└── package.json
```

---

## How to Collaborate

### 1️⃣ **Adil (Project Manager)**
**What to do:**
- Create and update `ROADMAP.md` with milestones
- Document all decisions in `DECISIONS/`
- Take notes from team meetings in `TEAM_MEETINGS/`
- Coordinate between team members
- Update project status regularly

**Commands to push:**
```bash
cd team/adil-pm/
git add .
git commit -m "docs: Update roadmap and milestones"
git push origin main
```

---

### 2️⃣ **Samah (Frontend Developer)**
**What to do:**
- Develop React components in `src/components/`
- Create pages in `src/pages/`
- Update component status in `team/samah-frontend/COMPONENTS.md`
- Test all features in `TESTING_CHECKLIST.md`
- Document bugs in `BUGS_FIXED/log.md`

**Commands to push:**
```bash
cd /Users/adilradidi/Desktop/Triple/HSM-z-s-cloud
git add src/
git add team/samah-frontend/
git commit -m "feat(frontend): Add new component or feature"
git push origin main
```

**Example commits:**
- `feat(frontend): Create CourseDetails component`
- `fix(frontend): Fix responsive layout on mobile`
- `refactor(frontend): Optimize CourseCard performance`

---

### 3️⃣ **Housam (Backend Developer)**
**What to do:**
- Develop microservices in `services/`
- Maintain API Gateway in `gateway/`
- Update database schema documentation
- Document API endpoints in `ENDPOINTS.md`
- Fix bugs and log them in `BUGS_FIXED/`
- Optimize database queries

**Commands to push:**
```bash
cd /Users/adilradidi/Desktop/Triple/HSM-z-s-cloud
git add services/
git add gateway/
git add docker/
git add team/housam-backend/
git commit -m "feat(backend): Add enrollment endpoint"
git push origin main
```

**Example commits:**
- `feat(api): Add GET /enrollments/me endpoint`
- `fix(auth): Fix JWT secret mismatch`
- `perf(db): Add MongoDB indexes for users collection`
- `refactor(gateway): Improve rate limiting logic`

---

### 4️⃣ **Zouhair (Documentation & QA)**
**What to do:**
- Write and update API documentation
- Create system architecture diagrams
- Track bugs and issues in `DEBUGGING/`
- Test all features and report issues
- Monitor system health and performance
- Create user guides and tutorials

**Commands to push:**
```bash
cd /Users/adilradidi/Desktop/Triple/HSM-z-s-cloud
git add team/zouhair-docs/
git commit -m "docs: Update API documentation and error codes"
git push origin main
```

**Example commits:**
- `docs(api): Add authentication endpoints documentation`
- `docs(guide): Create setup guide for developers`
- `docs(bugs): Track and document JWT verification issue`
- `docs(monitoring): Add health check results`

---

## Git Workflow

### Step 1: Sync with latest code
```bash
git pull origin main
```

### Step 2: Create a feature branch (optional but recommended)
```bash
git checkout -b feature/your-feature-name
```

### Step 3: Make your changes
```bash
# Edit files in your directory
```

### Step 4: Commit your changes
```bash
git add .
git commit -m "type(scope): description"

# Types: feat, fix, docs, refactor, perf, test, chore
# Scope: frontend, backend, api, docs, etc
```

### Step 5: Push to GitHub
```bash
git push origin main  # or your feature branch
```

---

## Commit Message Format

```
type(scope): description

[optional body]
[optional footer]

Examples:
- feat(frontend): Add dark mode toggle
- fix(backend): Resolve JWT verification bug
- docs(api): Update authentication documentation
- refactor(gateway): Improve error handling
```

---

## Communication Guidelines

### Daily Standup
- **Time**: 10:00 AM
- **Duration**: 15 minutes
- **What to share**: What you did, what you're doing, blockers

### Weekly Review
- **Time**: Friday 3:00 PM
- **What to review**: Progress, issues, next week plan

### Slack Channels
- `#learning-hub-team` - General discussion
- `#frontend` - Frontend specific
- `#backend` - Backend specific
- `#docs` - Documentation updates
- `#bugs` - Bug reports and fixes

---

## Team Responsibilities Checklist

### Adil - Project Manager
- [ ] Update ROADMAP.md weekly
- [ ] Track milestones and deadlines
- [ ] Resolve team blockers
- [ ] Coordinate code reviews
- [ ] Plan release schedule

### Samah - Frontend Developer
- [ ] Implement responsive designs
- [ ] Write component tests
- [ ] Update COMPONENTS.md
- [ ] Ensure accessibility compliance
- [ ] Optimize frontend performance

### Housam - Backend Developer
- [ ] Build and maintain APIs
- [ ] Optimize database queries
- [ ] Update API documentation
- [ ] Ensure code security
- [ ] Monitor service health

### Zouhair - Documentation & QA
- [ ] Keep documentation up-to-date
- [ ] Test all features thoroughly
- [ ] Track and document bugs
- [ ] Monitor system performance
- [ ] Create user guides

---

## Current Status

| Component | Status | Owner | ETA |
|-----------|--------|-------|-----|
| **Frontend** | 🟢 In Progress | Samah | 2026-03-31 |
| **Backend** | 🟢 In Progress | Housam | 2026-03-31 |
| **Documentation** | 🟢 In Progress | Zouhair | 2026-03-28 |
| **Project Management** | 🟢 Active | Adil | - |

---

## Important Notes

⚠️ **Before pushing code:**
1. Make sure you're in the right directory
2. Run tests locally
3. Update relevant documentation
4. Write clear commit messages
5. Pull latest changes first

🔒 **Security:**
- Never commit passwords or secrets
- Use environment variables
- Keep JWT_SECRET safe
- Don't push node_modules or .env files

📝 **Documentation:**
- Keep README files updated
- Comment complex logic
- Document new features
- Update CHANGELOG.md

---

## Resources

- **GitHub**: [Repository Link]
- **Postman**: [API Collection Link]
- **Design**: [Figma/Design Link]
- **Project Board**: [Trello/Jira Link]

---

**Version**: 1.0  
**Last Updated**: 2026-03-24  
**Maintained by**: Adil (Project Manager)

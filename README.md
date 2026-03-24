# 💻 Samah - Frontend Developer

## Role
**Frontend Developer**

## Responsibilities
- React component development
- UI/UX implementation
- Responsive design (mobile, tablet, desktop)
- Frontend testing (unit & integration tests)
- Performance optimization
- Accessibility compliance

## Technology Stack
- **Framework**: React 18.2.0
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Package Manager**: npm

## Directory Structure
```
samah-frontend/
├── README.md (this file)
├── COMPONENTS.md
├── PAGES.md
├── STYLING_GUIDE.md
├── TESTING_CHECKLIST.md
├── FEATURES/
│   ├── authentication/
│   │   └── status.md
│   ├── courses/
│   │   └── status.md
│   ├── enrollments/
│   │   └── status.md
│   └── dashboard/
│       └── status.md
└── BUGS_FIXED/
    └── log.md
```

## Current Features
- ✅ Login/Registration page
- ✅ Courses listing page
- ✅ Enrollment system
- ✅ My Enrollments page
- ✅ Home page with features
- 🔄 Course details page (TODO)
- 🔄 User profile page (TODO)
- 🔄 Progress tracking (TODO)

## Component Checklist
- [x] Navbar.jsx
- [x] CourseCard.jsx
- [x] EnrollmentList.jsx
- [ ] CourseDetails.jsx
- [ ] UserProfile.jsx
- [ ] ProgressTracker.jsx
- [ ] NotificationBell.jsx
- [ ] SearchBar.jsx

## Pages Implemented
- [x] Home.jsx - Landing page with features
- [x] Login.jsx - Authentication
- [x] Courses.jsx - Course listing
- [x] MyEnrollments.jsx - Student enrollments
- [ ] CourseDetail.jsx
- [ ] Dashboard.jsx
- [ ] Profile.jsx

## Frontend API Endpoints
```
Base URL: http://localhost:4000/api

Authentication:
- POST /auth/register - Register new user
- POST /auth/login - Login user
- POST /auth/verify - Verify token
- POST /auth/logout - Logout user

Courses:
- GET /courses - Get all courses
- GET /courses/:id - Get course details
- POST /courses - Create course (admin)

Enrollments:
- GET /enrollments/me - Get my enrollments
- POST /enrollments - Enroll in course
- DELETE /enrollments/:id - Unenroll
```

## Development Guidelines
1. **Component Structure**: One component per file
2. **Naming**: PascalCase for components, camelCase for variables
3. **Styling**: Use Tailwind CSS classes
4. **State Management**: React hooks (useState, useContext)
5. **Error Handling**: Always handle API errors gracefully
6. **Responsive**: Mobile-first approach

## Testing Checklist
- [ ] Component renders correctly
- [ ] Form validation works
- [ ] API calls handled properly
- [ ] Error messages displayed
- [ ] Mobile responsive (< 640px)
- [ ] Tablet responsive (640px - 1024px)
- [ ] Desktop responsive (> 1024px)
- [ ] Accessibility (alt text, labels, ARIA)

## Common Issues & Solutions
| Issue | Solution |
|-------|----------|
| API 401 Unauthorized | Check token in localStorage |
| CORS errors | Gateway is running on port 4000 |
| Styles not applying | Clear browser cache, restart dev server |
| Navigation not working | Check React Router Link components |

## Deployment
```bash
# Build for production
npm run build

# Start development server
npm start

# Run tests
npm test
```

## Resources
- Tailwind CSS: https://tailwindcss.com
- React Docs: https://react.dev
- React Router: https://reactrouter.com
- Axios: https://axios-http.com

---
**Last Updated**: 2026-03-24
**Version**: 1.0
**Contact**: adil@learning-hub.com

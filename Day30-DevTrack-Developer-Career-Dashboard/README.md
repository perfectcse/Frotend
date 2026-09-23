# DevTrack — Developer Career Dashboard

DevTrack is a modern React-based career management dashboard designed to help developers organize their job applications, interviews, and learning progress in one place.

It provides a centralized workspace for tracking career activities with CRUD operations, search and filtering, analytics, persistent local storage, dark mode, responsive design, and client-side routing.

---

## 🚀 Project Overview

Managing a software development career often involves tracking multiple job applications, interviews, technical skills, and learning goals across different platforms.

DevTrack brings these activities together into a single dashboard.

The application allows users to:

- Track job applications
- Manage interviews
- Track learning goals and technical skills
- Monitor career progress through analytics
- View recent applications and upcoming interviews
- Persist data using browser Local Storage
- Switch between Light and Dark themes
- Navigate through separate application pages using React Router

---

## ✨ Features

### 📊 Dashboard

The dashboard provides a quick overview of career activity.

- Total applications
- Total interviews
- Selected opportunities
- Overall learning progress
- Recent applications
- Upcoming interviews

---

### 💼 Application Tracker

Manage job applications from a single interface.

Features include:

- Add applications
- Edit applications
- Delete applications
- Search applications
- Filter applications by status
- Track company, role, location, status and other details

Supported application statuses:

- Applied
- Interview
- Selected
- Rejected

---

### 🎤 Interview Tracker

Keep track of technical and HR interviews.

Features include:

- Add interviews
- Edit interviews
- Delete interviews
- Search interviews
- Filter interviews by status
- Track interview rounds
- Track interview dates
- View interview statistics

Supported interview statuses:

- Scheduled
- Completed
- Passed
- Failed

---

### 📚 Learning Tracker

Track technical learning and career development.

Features include:

- Add learning items
- Edit learning items
- Delete learning items
- Search by skill or category
- Filter by learning status
- Track progress from 0–100%
- Calculate overall learning progress

Supported learning statuses:

- Not Started
- In Progress
- Completed

---

### 📈 Analytics

DevTrack provides an analytics view for understanding career progress.

Analytics include:

- Application status breakdown
- Application percentages
- Learning progress
- Completed learning items
- In-progress learning items
- Interview totals
- Completed interviews
- Passed interviews

---

### 🌙 Dark Mode

DevTrack includes Light and Dark themes.

The selected theme is stored in Local Storage so the preference remains available after refreshing the browser.

---

### 💾 Local Storage

The application uses browser Local Storage for client-side persistence.

The following data is stored locally:

- Applications
- Interviews
- Learning items
- Theme preference

No external backend database is required for the current version.

---

### 🧭 Routing

DevTrack uses React Router for page navigation.

Available routes:

```text
/dashboard
/applications
/interviews
/learning
/analytics
/settings

The root route redirects to:
/dashboard

🛠️ Tech Stack
Frontend
React
JavaScript
HTML5
CSS3

Libraries & Tools
React Router DOM
Vite
ESLint
Git
GitHub
Browser Local Storage

🏗️ Application Architecture

DevTrack follows a component-based React architecture.

The project separates:

Pages
Reusable UI components
Layout components
Application state
Context management
Styling

Global career data is managed through React Context and shared across the application.

📁 Project Structure

Day30-DevTrack-Developer-Career-Dashboard/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── analytics/
│   │   │   ├── Analytics.css
│   │   │   └── Analytics.jsx
│   │   │
│   │   ├── applications/
│   │   │   ├── ApplicationForm.css
│   │   │   ├── ApplicationForm.jsx
│   │   │   ├── ApplicationList.css
│   │   │   └── ApplicationList.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── Dashboard.css
│   │   │   ├── Dashboard.jsx
│   │   │   ├── RecentApplications.css
│   │   │   ├── RecentApplications.jsx
│   │   │   ├── SummaryCard.css
│   │   │   ├── SummaryCard.jsx
│   │   │   ├── UpcomingInterviews.css
│   │   │   └── UpcomingInterviews.jsx
│   │   │
│   │   ├── interviews/
│   │   │   ├── InterviewForm.css
│   │   │   ├── InterviewForm.jsx
│   │   │   ├── InterviewList.css
│   │   │   ├── InterviewList.jsx
│   │   │   ├── InterviewStats.css
│   │   │   └── InterviewStats.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.css
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.css
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.css
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── learning/
│   │   │   ├── LearningForm.css
│   │   │   ├── LearningForm.jsx
│   │   │   ├── LearningList.css
│   │   │   └── LearningList.jsx
│   │   │
│   │   └── settings/
│   │       ├── Settings.css
│   │       └── Settings.jsx
│   │
│   ├── context/
│   │   ├── DevTrackContext.jsx
│   │   ├── devTrackStore.js
│   │   └── useDevTrack.js
│   │
│   ├── pages/
│   │   ├── AnalyticsPage.jsx
│   │   ├── ApplicationsPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── InterviewsPage.jsx
│   │   ├── LearningPage.jsx
│   │   └── SettingsPage.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js


⚙️ Getting Started

1. Clone the repository
git clone https://github.com/perfectcse/Frotend.git

2. Navigate to the project
cd Frotend/Day30-DevTrack-Developer-Career-Dashboard

3. Install dependencies
npm install

4. Start the development server
npm run dev

📦 Available Scripts
Start development server
npm run dev

Create production build
npm run build

Run ESLint
npm run lint

Preview production build
npm run preview

🧪 Testing

The application has been tested across:

CRUD operations
Search
Filters
Form validation
Empty states
Edge cases
Dark mode
Local Storage persistence
Client-side routing
Responsive layouts
Keyboard navigation
Focus states
Browser zoom
Production build
ESLint validation

Production build:

65 modules transformed
Production build completed successfully

📱 Responsive Design

DevTrack is designed to work across:

Desktop
Tablet
Mobile

The responsive layout adapts navigation, cards, forms, lists, and analytics content for different viewport sizes.

♿ Accessibility & UX

The application includes basic accessibility and usability improvements such as:

Keyboard navigation
Visible keyboard focus states
Accessible navigation labeling
Clearly labeled form inputs
Responsive layouts
Readable contrast
Consistent interactive states

🔐 Data & Privacy

DevTrack currently works entirely on the client side.

Career data is stored in the browser using Local Storage.

No external database or backend API is required for the current version.

Because the data is stored locally, clearing browser storage will remove the locally saved DevTrack data.

🌐 Live Demo
Render deployment coming soon.

🎯 What I Learned

This project helped strengthen practical skills in:

React component architecture
React Hooks
React Context API
Shared state management
React Router
CRUD operations
Local Storage
Form handling
Validation
Search and filtering
Responsive CSS
Dark mode implementation
Accessibility basics
Production build workflows
Git and GitHub


👨‍💻 Author

Vishal Mishra

Frontend / MERN Stack Developer

GitHub:

https://github.com/perfectcse

📄 License

This project was created for learning, portfolio development, and demonstration purposes.



🐙 Day 14 – GitHub Profile Finder
📌 Project Overview
This project is a GitHub Profile Finder web app built using HTML, CSS, and JavaScript.
It allows users to search any GitHub username and view profile details in a clean and modern UI.
The app uses the GitHub public API to fetch real-time data without requiring an API key.

✨ Features

🔍 Search GitHub users by username
👤 Display profile image, name, and bio
📊 Show followers, following, and repository count
🔗 Direct link to GitHub profile
📦 Display top repositories
⏳ Loading state while fetching data
❌ Error handling (user not found)
🎨 Modern UI with glassmorphism effects


🧱 Technologies Used

HTML5 (Semantic structure)
CSS3 (Flexbox, Gradient, Glass UI)
JavaScript (ES6+)
GitHub API (Public API)


⚡ How It Works

User enters a GitHub username
JavaScript listens for form submission
API request is sent using fetch()
User data is received in JSON format
Profile UI is dynamically updated
Additional API call fetches repositories


📂 Folder Structure
day-14-github-finder/
│
├── index.html
├── style.css
├── script.js
└── README.md


🧠 Concepts Learned
🔹 JavaScript

Fetch API (fetch)
Async/Await
DOM manipulation
Event handling (form submit)
Conditional rendering
Error handling

🔹 API Integration

Using public APIs
Handling API responses
Chaining multiple API calls

🔹 UI/UX

Card-based design
Flexbox layout
Hover effects
Responsive structure
Glassmorphism UI


🎯 Key Highlights

Real-time GitHub data 🌐
Dynamic UI rendering 🧠
Clean and structured code
Improved user experience


🚀 Future Improvements

📄 Pagination for repositories
⭐ Show starred repositories
🔍 Debounced search (better performance)
🌙 Dark/Light mode toggle
📱 Mobile optimization
📊 Charts for stats (advanced)
🧑‍💻 Show pinned repositories


⚠️ Note

Uses public GitHub API (no API key required)
Limited by GitHub API rate limits


🙌 Author
Vishal – Frontend Developer Journey 🚀


https://githubprojectlink.netlify.app/
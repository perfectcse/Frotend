📝 Day 7 – Signup Form Validation (Final Project)
📌 Project Overview
This project is a Signup Form with client-side validation built using HTML, CSS, and JavaScript. The form validates user inputs such as name, email, password, and confirm password before allowing successful registration.
This final version also includes show/hide password functionality and stores user data in localStorage.

✨ Features

Name required validation
Email format validation using Regex
Password minimum length validation
Confirm password match validation
Error messages for invalid inputs
Success message on valid form submission
Input border color change (error/success)
Show / Hide password option
Form reset after successful submission
Store user data in localStorage
Modern glassmorphism UI design


🧱 Technologies Used

HTML5
CSS3 (Flexbox, Glassmorphism UI, Transitions)
JavaScript (DOM Manipulation, Events, Regex, Validation Functions, localStorage)


⚡ Functionality
🔹 Form Validation Rules

Name cannot be empty
Email must be in valid format
Password must be at least 6 characters
Confirm password must match password

🔹 Form Submission Flow

User fills the form
User clicks Register button
preventDefault() stops page reload
JavaScript validation functions check inputs
Error messages shown if invalid
Success border shown for valid inputs
If all fields are valid:

Success message displayed
Data stored in localStorage
Form resets automatically




💾 Data Storage
User data is stored in browser localStorage as a JSON object.
Stored Data Example
{
  name: "John Doe",
  email: "john@gmail.com",
  password: "123456"
}

localStorage Methods Used

localStorage.setItem()
localStorage.getItem()
JSON.stringify()
JSON.parse()


🧠 Concepts Learned

Form submit event handling
preventDefault()
DOM manipulation
Input validation logic
Regular expressions (Email validation)
Error handling and user feedback
CSS class toggling
Reusable validation functions
Show/Hide password functionality
localStorage for data storage
JSON stringify and parse
Building real-world form validation system


📂 Folder Structure
day-07-form-validation/
│
├── index.html
├── style.css
├── script.js
└── README.md


💼 Real World Use Case
Form validation is used in:

Login forms
Signup forms
Contact forms
Checkout forms
Registration systems
Authentication pages

This is a very common real-world frontend task.

🚀 Future Improvements

Password strength indicator
Dark/Light theme toggle
Phone number validation
Store multiple users
Backend integration (database)
Login system
Email verification


📸 Preview
(Add your project screenshot here)

🙌 Author
Vishal – Frontend Developer Journey 🚀

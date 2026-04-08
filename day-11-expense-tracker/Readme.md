💰 Day 11 – Expense Tracker (Advanced Version)
📌 Project Overview
This project is a fully functional Expense Tracker built using HTML, CSS, and JavaScript. It allows users to add, manage, and track their income and expenses with real-time updates and persistent storage using localStorage.
This is a real-world application that demonstrates CRUD operations, UI/UX improvements, and state management in JavaScript.

✨ Features

Add income and expense transactions
Delete transactions
Display current balance
Show total income and total expense
Indian currency formatting (₹)
Display transaction date
Data stored in localStorage (persistent after refresh)
Hover and click-based delete button visibility
Clean and modern UI
Scrollable transaction history
Empty state message when no transactions


🧱 Technologies Used

HTML5
CSS3 (Flexbox, Clean UI Design)
JavaScript (DOM Manipulation, Events, Arrays, localStorage)


⚡ How It Works


User enters:

Description
Amount (+ for income, - for expense)
Date



Clicks "Add Transaction"


Transaction is:

Added to an array
Displayed in UI
Stored in localStorage



App calculates:

Total Balance
Total Income
Total Expense



User can:

Click on amount → show delete button
Delete transaction



On page refresh:

Data loads from localStorage




💾 localStorage Used

localStorage.setItem()
localStorage.getItem()
JSON.stringify()
JSON.parse()

This ensures data persistence.

🧠 Concepts Learned

DOM Manipulation
Event Listeners
Arrays of Objects
CRUD Operations (Create, Read, Update, Delete)
localStorage
JSON Handling
Dynamic UI Rendering
Conditional Styling
Currency Formatting
Date Formatting
UI/UX Improvements


📂 Folder Structure
day-11-expense-tracker/
│
├── index.html
├── style.css
├── script.js
└── README.md


🎯 Key Features Breakdown
➤ Balance Calculation

Adds all transactions
Updates dynamically

➤ Income / Expense Separation

Positive = Income
Negative = Expense

➤ Smart Delete Button

Hidden by default
Visible on hover or click

➤ Persistent Data

Stored in browser localStorage


🚀 Future Improvements

Add category (Food, Travel, Bills)
Add filter (Income / Expense)
Add monthly report
Add charts (Graph visualization)
Add edit transaction feature
Add export to CSV/PDF
Add dark mode


📸 Preview
(Add your project screenshot here)

🙌 Author
Vishal – Frontend Developer Journey 🚀

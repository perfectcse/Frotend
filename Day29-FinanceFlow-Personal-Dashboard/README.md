# FinanceFlow — Personal Finance Dashboard

FinanceFlow is a modern, responsive personal finance dashboard built with React.js and Vite.

It allows users to track income and expenses, manage transactions, analyze spending by category, monitor monthly financial performance, and switch between light and dark themes.

## 🚀 Live Demo

[View FinanceFlow Live](https://frotend-kd7w.onrender.com)

## 📌 Project Overview

FinanceFlow was built as a practical frontend application to demonstrate how React can be used to build a data-driven dashboard with reusable components, state management, CRUD operations, derived calculations, Local Storage persistence, responsive design, and theme management.

The application focuses on making personal financial activity easy to understand through a clean dashboard interface.

## ✨ Features

### Dashboard

- Total Balance
- Total Income
- Total Expenses
- Savings
- Dynamic financial calculations

### Transaction Management

- Add transactions
- Edit transactions
- Delete transactions
- Income and expense transaction types
- Transaction categories
- Transaction dates
- Form validation

### Search & Filtering

- Search by transaction description
- Search by category
- Filter by All Transactions
- Filter by Income
- Filter by Expenses
- Combined search and filtering

### Spending Analytics

- Expense category breakdown
- Dynamic category totals
- Visual spending bars
- Automatically updates when transactions change

### Monthly Overview

- Current-month income
- Current-month expenses
- Current-month net balance
- Income spent percentage
- Automatically excludes transactions from other months

### User Experience

- Responsive desktop layout
- Tablet-friendly layout
- Mobile-friendly layout
- Light mode
- Dark mode
- Theme persistence
- User-friendly transaction dates
- Empty states
- Form validation

### Data Persistence

FinanceFlow uses browser Local Storage to persist:

- Transactions
- Selected theme

This allows data to remain available after refreshing the browser.

> Note: This version does not use a backend or cloud database. Data is stored locally in the user's browser.

---

## 🛠️ Technology Stack

### Frontend

- React.js
- JavaScript (ES6+)
- HTML5
- CSS3

### Development

- Vite
- npm

### Data Storage

- Browser Local Storage

### Version Control

- Git
- GitHub

### Deployment

- Render

---

## 🧩 Application Architecture

FinanceFlow follows a component-based React architecture.

```text
App
│
└── Layout
    │
    ├── Sidebar
    │
    ├── Header
    │
    └── Dashboard
        │
        ├── SummaryCard
        │
        ├── Analytics
        │
        ├── MonthlyOverview
        │
        └── TransactionList
            │
            └── TransactionForm

            Transaction State
       │
       ├── Summary Cards
       │
       ├── Spending Analytics
       │
       ├── Monthly Overview
       │
       └── Transaction List

📁 Project Structure

Day29-FinanceFlow-Personal-Dashboard
│
├── public
│
├── src
│   ├── components
│   │
│   │   ├── dashboard
│   │   │   ├── Analytics.css
│   │   │   ├── Analytics.jsx
│   │   │   ├── Dashboard.css
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MonthlyOverview.css
│   │   │   ├── MonthlyOverview.jsx
│   │   │   ├── SummaryCard.css
│   │   │   └── SummaryCard.jsx
│   │   │
│   │   ├── layout
│   │   │   ├── Header.css
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.css
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.css
│   │   │   └── Sidebar.jsx
│   │   │
│   │   └── transactions
│   │       ├── TransactionForm.css
│   │       ├── TransactionForm.jsx
│   │       ├── TransactionList.css
│   │       └── TransactionList.jsx
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── package-lock.json
├── index.html
└── README.md

🧠 Core Logic
Balance Calculation

The dashboard calculates balance by subtracting total expenses from total income.

Balance = Total Income - Total Expenses


Income Calculation

Only transactions with:
type === "income"

Expense Calculation

Only transactions with:

Expense Calculation

Only transactions with:

Spending Analytics

Expense transactions are grouped by category and their amounts are combined to calculate category-level spending.

Spending Analytics

Expense transactions are grouped by category and their amounts are combined to calculate category-level spending.


Monthly Calculations

Transactions are filtered using their date's month and year.

Only transactions belonging to the current month are included in:

Monthly Income
Monthly Expenses
Monthly Net
Income Spent percentage

💾 Local Storage

FinanceFlow uses the browser's Local Storage API.

Transaction data is stored under:

financeflow-transactions

financeflow-theme

🌙 Dark Mode

FinanceFlow includes a persistent light/dark theme system.

The application:

Stores the selected theme in Local Storage.
Reads the saved theme when the application starts.
Applies a dark class to the main layout.
Updates component styles based on the active theme.

User toggles theme
       ↓
React state updates
       ↓
Local Storage updated
       ↓
Dark/light class applied
       ↓
Dashboard UI updates

📱 Responsive Design

The interface was designed for:

Desktop
Tablet
Mobile

Responsive CSS breakpoints reorganize:

Summary cards
Monthly statistics
Transaction rows
Search/filter controls
Transaction forms
Header actions

The application was manually verified across desktop, tablet, and mobile layouts.

✅ Validation & Error Handling

The transaction form validates:

Description
Amount
Category
Date

Invalid input prevents transaction submission and displays an appropriate validation message.

The application also handles empty states for:

No transactions
No matching search/filter results
No expense analytics data

🧪 Testing

FinanceFlow was tested for:

Functional Testing
Add transaction
Edit transaction
Delete transaction
Search transactions
Filter transactions
Combined search and filter
Dashboard calculations
Monthly calculations
Spending analytics
Local Storage persistence
Theme persistence

Edge Cases
No transactions
Expense-only transactions
Income-only transactions
Zero income
Transactions from different months
No search results
Responsive Testing
Desktop
Tablet
Mobile
Production Testing

The application was successfully built using:

npm run build



🚀 Installation & Setup
1. Clone the repository
git clone https://github.com/perfectcse/Frotend.git
2. Navigate to the FinanceFlow project
cd Frotend/Day29-FinanceFlow-Personal-Dashboard
3. Install dependencies
npm install
4. Start the development server
npm run dev
5. Build for production
npm run build


🌐 Deployment

FinanceFlow is deployed as a static React application using Render.

Deployment configuration

Repository:
perfectcse/Frotend

Root Directory:
Day29-FinanceFlow-Personal-Dashboard

Build Command:
npm run build

Publish Directory:
dist


# 📝 Notes App

A simple, modern, and responsive **Notes Application** built using **HTML, CSS, and JavaScript**.

This application allows users to create, edit, delete, and search notes. All notes are saved in the browser using **localStorage**, so the data remains available even after refreshing the page.

---

## 🚀 Live Demo

🔗 **Live Website:** https://notedownwrite.netlify.app/

🔗 **GitHub Profile:** https://github.com/perfectcse

---

## ✨ Features

- ➕ Add new notes
- ✏️ Edit existing notes
- 🗑️ Delete notes
- 🔍 Search notes by title
- 🔍 Search notes by description
- 💾 Save notes using localStorage
- 📅 Display the note creation date
- 🔄 Keep notes after page refresh
- 📱 Responsive design
- ✨ Modern note-card UI

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- LocalStorage API

---

## 📁 Project Structure

```text
Day-21-Notes-App/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## ⚙️ How to Run the Project

1. Download or clone the project.

2. Open the project folder in VS Code.

3. Open `index.html` using the **Live Server** extension.

4. Enter a note title and description.

5. Click the **Add Note** button.

---

## 🔄 Application Flow

```text
Enter Note Title and Description
                ↓
Click Add Note
                ↓
Create a Note Object
                ↓
Add Note to the Notes Array
                ↓
Save Notes in localStorage
                ↓
Display Notes on the Screen
                ↓
Search, Edit or Delete Notes
```

---

## 🧠 JavaScript Concepts Learned

### DOM Manipulation

The DOM is used to select and dynamically update HTML elements.

Methods used:

```javascript
document.getElementById();

document.createElement();

element.innerHTML;

element.appendChild();
```

---

### Event Handling

Event listeners are used to respond to user actions.

Events used:

```javascript
submit

input

click
```

---

### Arrays and Objects

Every note is stored as an object:

```javascript
{
    id: 1720521000000,

    title: "Learn JavaScript",

    description: "Practice DOM manipulation",

    date: "09/07/2026"
}
```

All note objects are stored inside the `notes` array.

---

## 📚 Array Methods Used

### `forEach()`

Used to display every note.

```javascript
notes.forEach(note => {

    console.log(note);

});
```

---

### `find()`

Used to find the selected note while editing.

```javascript
const note = notes.find(

    item => item.id === id

);
```

---

### `filter()`

Used to delete and search notes.

```javascript
notes = notes.filter(

    item => item.id !== id

);
```

---

### `unshift()`

Used to add a new note at the beginning of the array.

```javascript
notes.unshift(newNote);
```

---

## 💾 localStorage

The application saves notes in browser storage.

### Save Notes

```javascript
localStorage.setItem(

    "notes",

    JSON.stringify(notes)

);
```

### Get Notes

```javascript
JSON.parse(

    localStorage.getItem("notes")

);
```

`JSON.stringify()` converts the JavaScript array into a string.

`JSON.parse()` converts the stored string back into a JavaScript array.

---

## 🔄 CRUD Operations

CRUD means:

| Operation | Feature |
|---|---|
| Create | Add a new note |
| Read | Display all notes |
| Update | Edit an existing note |
| Delete | Delete a note |

---

## 🧪 Testing Checklist

- [ ] App loads without errors
- [ ] Add a new note
- [ ] Add multiple notes
- [ ] Empty fields show validation
- [ ] Notes appear as cards
- [ ] Search by note title
- [ ] Search by note description
- [ ] Edit a note
- [ ] Update the note successfully
- [ ] Delete a note
- [ ] Cancel the delete confirmation
- [ ] Refresh the browser
- [ ] Notes remain after refresh
- [ ] Test the mobile layout
- [ ] Check the browser console for errors

---

## 🎯 What I Learned

Through this project, I learned:

- Creating forms using HTML
- Designing responsive layouts using CSS
- Working with JavaScript arrays and objects
- DOM manipulation
- Event handling
- Form validation
- CRUD operations
- Dynamic note rendering
- Searching data using `filter()`
- Editing data using `find()`
- Saving browser data using localStorage
- Converting data using `JSON.stringify()`
- Reading stored data using `JSON.parse()`

---

## 🎤 Interview Questions and Answers

### 1. What is localStorage?

`localStorage` is a browser storage feature that stores data as key-value pairs. The saved data remains available after refreshing or reopening the browser.

---

### 2. Why do we use `JSON.stringify()`?

`localStorage` stores strings. `JSON.stringify()` converts a JavaScript array or object into a string.

---

### 3. Why do we use `JSON.parse()`?

`JSON.parse()` converts stored JSON text back into a JavaScript array or object.

---

### 4. What is CRUD?

CRUD stands for:

- Create
- Read
- Update
- Delete

---

### 5. Why is `find()` used?

`find()` returns the first array item that matches a condition. In this project, it finds the selected note for editing.

---

### 6. Why is `filter()` used?

`filter()` creates a new array containing items that match a condition. It is used for searching and deleting notes.

---

### 7. Why is `preventDefault()` used?

Forms refresh the page by default. `preventDefault()` stops the refresh so JavaScript can handle the form submission.

---

### 8. Why is `Date.now()` used?

`Date.now()` creates a unique numeric ID using the current time in milliseconds.

---

### 9. How does the search feature work?

The search value is converted to lowercase. The `filter()` method checks whether the note title or description contains the entered keyword.

---

### 10. Explain the Notes App flow.

The user enters a title and description. JavaScript creates a note object, adds it to an array, saves the array in localStorage, and dynamically displays the note on the page.

---

## 🚀 Future Improvements

- 📌 Pin important notes
- 🎨 Add note colors
- 🏷️ Add note categories
- 🌙 Add dark mode
- 📅 Add an updated date
- 🔐 Add user authentication
- ☁️ Connect to a backend
- 🗄️ Store notes in MongoDB
- ⚛️ Build a React version

---

## 👨‍💻 Author

**Vishal Mishra**

Frontend / MERN Stack Developer

GitHub:  
https://github.com/perfectcse

---

## ⭐ Support

If you like this project, consider giving the GitHub repository a ⭐.

Happy Coding! 🚀
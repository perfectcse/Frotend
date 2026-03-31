const noteText = document.getElementById("noteText");
const addNoteBtn = document.getElementById("addNote");
const notesContainer = document.getElementById("notesContainer");

// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Show Notes
function showNotes() {
  notesContainer.innerHTML = "";

  notes.forEach((note, index) => {
    const div = document.createElement("div");
    div.className = "note";

    div.innerHTML = `
      <p>${note}</p>
      <div class="note-actions">
        <button onclick="editNote(${index})">Edit</button>
        <button onclick="deleteNote(${index})">Delete</button>
      </div>
    `;

    notesContainer.appendChild(div);
  });

  // Save to localStorage
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Add Note
addNoteBtn.addEventListener("click", addNote);

// Enter key support
noteText.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addNote();
  }
});

function addNote() {
  if (noteText.value.trim() === "") return;

  notes.push(noteText.value);
  noteText.value = "";
  showNotes();
}

// Delete Note
function deleteNote(index) {
  notes.splice(index, 1);
  showNotes();
}

// Edit Note
function editNote(index) {
  noteText.value = notes[index];
  notes.splice(index, 1);
  showNotes();
}

// Initial Load
showNotes();
// =================================
// DOM ELEMENTS
// =================================

const noteForm = document.getElementById("noteForm");
const titleInput = document.getElementById("noteTitle");
const descriptionInput =
    document.getElementById("noteDescription");

const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("search");
const notesContainer =
    document.getElementById("notesContainer");


// =================================
// GET NOTES FROM LOCAL STORAGE
// =================================

let notes =
    JSON.parse(localStorage.getItem("notes")) || [];


// Stores the ID of the note being edited

let editId = null;


// =================================
// SAVE NOTES
// =================================

function saveNotes() {

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

}


// =================================
// DISPLAY NOTES
// =================================

function displayNotes(data = notes) {

    notesContainer.innerHTML = "";


    // Show message when no notes exist

    if (data.length === 0) {

        notesContainer.innerHTML = `

            <p class="empty">

                No notes available.
                Add your first note! 📝

            </p>

        `;

        return;

    }


    // Create a card for every note

    data.forEach(note => {

        const noteCard =
            document.createElement("div");


        noteCard.classList.add("note-card");


        noteCard.innerHTML = `

            <h3>${note.title}</h3>


            <p>

                ${note.description}

            </p>


            <small>

                📅 ${note.date}

            </small>


            <div class="note-actions">


                <button

                    class="edit-btn"

                    onclick="editNote(${note.id})"

                >

                    ✏️ Edit

                </button>


                <button

                    class="delete-btn"

                    onclick="deleteNote(${note.id})"

                >

                    🗑️ Delete

                </button>


            </div>

        `;


        notesContainer.appendChild(noteCard);

    });

}


// =================================
// ADD OR UPDATE NOTE
// =================================

noteForm.addEventListener(
    "submit",
    function (event) {

        // Stop page refresh

        event.preventDefault();


        const title =
            titleInput.value.trim();


        const description =
            descriptionInput.value.trim();


        // Validation

        if (
            title === "" ||
            description === ""
        ) {

            alert(
                "Please enter title and description."
            );

            return;

        }


        // UPDATE EXISTING NOTE

        if (editId !== null) {


            const note = notes.find(

                item => item.id === editId

            );


            if (note) {

                note.title = title;

                note.description =
                    description;

            }


            editId = null;


            addBtn.textContent =
                "Add Note";

        }


        // ADD NEW NOTE

        else {


            const newNote = {

                id: Date.now(),

                title: title,

                description:
                    description,

                date:
                    new Date()
                    .toLocaleDateString(
                        "en-IN"
                    )

            };


            notes.unshift(newNote);

        }


        // Save updated notes

        saveNotes();


        // Display updated notes

        displayNotes();


        // Clear form

        noteForm.reset();

    }
);


// =================================
// EDIT NOTE
// =================================

function editNote(id) {


    const note = notes.find(

        item => item.id === id

    );


    if (!note) {

        return;

    }


    // Put note data in form

    titleInput.value =
        note.title;


    descriptionInput.value =
        note.description;


    // Save editing ID

    editId = id;


    // Change button text

    addBtn.textContent =
        "Update Note";


    // Move screen to form

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// =================================
// DELETE NOTE
// =================================

function deleteNote(id) {


    const confirmDelete =
        confirm(
            "Are you sure you want to delete this note?"
        );


    if (!confirmDelete) {

        return;

    }


    // Remove selected note

    notes = notes.filter(

        item => item.id !== id

    );


    // Save updated notes

    saveNotes();


    // Display remaining notes

    displayNotes();


    // Reset form if editing

    if (editId === id) {

        editId = null;

        noteForm.reset();

        addBtn.textContent =
            "Add Note";

    }

}


// =================================
// SEARCH NOTES
// =================================

searchInput.addEventListener(
    "input",
    function () {


        const keyword =

            searchInput.value
            .toLowerCase()
            .trim();


        const filteredNotes =

            notes.filter(note => {


                return (

                    note.title
                    .toLowerCase()
                    .includes(keyword)

                    ||

                    note.description
                    .toLowerCase()
                    .includes(keyword)

                );

            });


        displayNotes(
            filteredNotes
        );

    }
);


// =================================
// INITIAL DISPLAY
// =================================

displayNotes();
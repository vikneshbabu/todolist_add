console.log('Hello World!');
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  const list = document.getElementById("noteList");
  list.innerHTML = "";
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${note} <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>`;
    list.appendChild(li);
  });
}

function addNote() {
  const input = document.getElementById("noteInput");
  const text = input.value.trim();
  if (text) {
    notes.push(text);
    input.value = "";
    saveNotes();
    renderNotes();
  }
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function exportNotes() {
  const content = notes.join("\n\n");
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "my_notes.txt";
  link.click();
}

// Initial render
renderNotes();

// cloud storage 
function saveToCloud() {
  const userNotes = notes; // Your local array
  db.collection("notes").doc("user1") // Replace "user1" with dynamic user ID in real apps
    .set({ notes: userNotes })
    .then(() => alert("Notes saved to cloud!"))
    .catch(err => console.error("Error saving notes:", err));
}

function loadFromCloud() {
  db.collection("notes").doc("user1")
    .get()
    .then(doc => {
      if (doc.exists) {
        notes = doc.data().notes;
        saveNotes(); // Update localStorage
        renderNotes(); // Update UI
        alert("Notes loaded from cloud!");
      } else {
        alert("No notes found in cloud.");
      }
    })
    .catch(err => console.error("Error loading notes:", err));
}

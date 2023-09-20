import Category from './Category.js';
import Note from './Note.js';
import generateNoteElement from './generateNoteElement.js';
import openNoteForm from './openNoteForm.js';
import NotesStorage from './NotesStorage.js';

const initialNotes = [
  new Note(
    'Shopping',
    'Go shopping on 02/03/2022 or 05/03/2022.',
    Category.categories[0]
  ),
  new Note('Random thought', 'Random thought #1', Category.categories[1]),
  new Note(
    'Doctor',
    'Date of the appointment is 01/01/2022.',
    Category.categories[0]
  ),
  new Note('Note #4', 'Note #4 content', Category.categories[2]),
  new Note('Note #5', 'Note #5 content', Category.categories[1]),
  new Note(
    'Dentist appointment',
    `I'm gonna have a dentist appointment on the 3/5/2021,
I moved it from 5/5/2021`,
    Category.categories[0]
  ),
  new Note('Note #7', 'Note #7 content', Category.categories[1]),
];

let showArchived = false;

const notesTableBodyElement = document.querySelector('#notes-table-body');

const notesStorage = new NotesStorage();

if (!notesStorage.load()) {
  console.log('hhhh');
  notesStorage.notes = [...initialNotes];
}

function updateNotes() {
  if (showArchived) notesTableBodyElement.classList.add('show-archived');
  else notesTableBodyElement.classList.remove('show-archived');

  const notes = notesStorage.notes;

  notesTableBodyElement.textContent = '';
  notesTableBodyElement.append(
    ...notes
      .filter((note) => note.isArchived === showArchived)
      .map((note) =>
        generateNoteElement({
          ...note.toRenderObject(),
          editClickHandler: () => {
            openNoteForm(notes.indexOf(note), notes, updateNotes);
          },
          archiveClickHandler: () => {
            note.isArchived = !note.isArchived;
            updateNotes();
          },
          deleteClickHandler: () => {
            notes.splice(notes.indexOf(note), 1);
            updateNotes();
          },
        })
      )
  );

  notesStorage.save();
}

updateNotes();

document
  .querySelector('#head-archive-button')
  .addEventListener('click', (event) => {
    showArchived = !showArchived;

    event.target.classList.remove('from-archive-button');
    event.target.classList.remove('to-archive-button');

    event.target.classList.add(
      showArchived ? 'from-archive-button' : 'to-archive-button'
    );

    updateNotes();
  });

document.querySelector('#new-note-button').addEventListener('click', () => {
  openNoteForm(null, notesStorage.notes, updateNotes);
});

document.querySelector('#reset').addEventListener('click', () => {
  notesStorage.notes = [...initialNotes];
  notesStorage.save();
  updateNotes();
});

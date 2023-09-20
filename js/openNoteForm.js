import generateNoteFormElement from './generateNoteFormElement.js';
import Category from './Category.js';
import validateNoteForm, { InvalidNoteFormError } from './validateNoteForm.js';
import Note from './Note.js';

const noteFormBackgroundElement = document.querySelector(
  '#note-form-background'
);

function closeNoteForm() {
  noteFormBackgroundElement.classList.remove('visible');
  document.querySelector('#note-form').remove();
}

export default function openNoteForm(noteIndex, notes, updateNotes) {
  function submitHandler(event) {
    const formData = new FormData(event.target);

    let validatedForm;

    try {
      validatedForm = validateNoteForm(formData);
    } catch (e) {
      if (e instanceof InvalidNoteFormError) {
        alert(e.message);
        return;
      } else throw e;
    }

    if (typeof noteIndex === 'number') {
      const note = notes[noteIndex];

      note.name = validatedForm.name;
      note.content = validatedForm.content;
      note.category = Category.categories[validatedForm.categoryIndex];
    } else {
      notes.push(
        new Note(
          validatedForm.name,
          validatedForm.content,
          Category.categories[validatedForm.categoryIndex]
        )
      );
    }

    updateNotes();
    closeNoteForm();
  }

  const formGenerationParameters = {
    submitHandler,
  };

  if (typeof noteIndex === 'number') {
    formGenerationParameters.initialValues = {
      ...notes[noteIndex].toRenderObject(),
      categoryIndex: Category.categories
        .findIndex(
          (category) => notes[noteIndex].category.name === category.name
        )
        .toString(),
    };
  }

  noteFormBackgroundElement.classList.add('visible');
  document.body.append(generateNoteFormElement(formGenerationParameters));
}

noteFormBackgroundElement.addEventListener('click', closeNoteForm);

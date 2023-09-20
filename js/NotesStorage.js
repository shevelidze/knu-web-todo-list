import Note from './Note.js';

const NOTES_LOCAL_STORAGE_KEY = 'notes';

export default class NotesStorage {
  constructor() {
    this.notes = [];
  }
  save() {
    localStorage.setItem(NOTES_LOCAL_STORAGE_KEY, JSON.stringify(this.notes));
  }
  load() {
    const itemFromLocalStorage = localStorage.getItem(NOTES_LOCAL_STORAGE_KEY);

    if (itemFromLocalStorage === null) {
      return false;
    }

    try {
      this.notes = JSON.parse(itemFromLocalStorage).map((notePlainObject) =>
        Note.fromPlainObject(notePlainObject)
      );

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

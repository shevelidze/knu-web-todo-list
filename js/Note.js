export default class Note {
  constructor(...args) {
    if (args.length === 3) {
      const [name, content, category] = args;

      this.name = name;
      this.content = content;
      this.category = category;
      this.creationDate = new Date();
      this.isArchived = false;
    }
  }

  toRenderObject() {
    return {
      name: this.name,
      creationDate: this.creationDate.toLocaleDateString(),
      categoryName: this.category.name,
      content: this.content,
      isArchived: this.isArchived,
      categoryIconUrl: this.category.iconUrl,
    };
  }

  static fromPlainObject(object) {
    const note = new Note();

    Object.assign(note, object);

    note.creationDate = new Date(note.creationDate);

    return note;
  }
}

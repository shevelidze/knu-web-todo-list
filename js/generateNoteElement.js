function wrapIntoTd(element) {
  const tdElement = document.createElement('td');

  tdElement.append(element);

  return tdElement;
}

export default function generateNoteElement({
  categoryIconUrl,
  name,
  creationDate,
  categoryName,
  content,
  isArchived,
  editClickHandler,
  deleteClickHandler,
  archiveClickHandler,
}) {
  const noteElement = document.createElement('tr');

  noteElement.innerHTML = `
    <td><img src=${categoryIconUrl} alt="Category icon" class="category-icon"></img></td>
    <td>${name}</td>
    <td>${creationDate}</td>
    <td>${categoryName}</td>
    <td>${content}</td>
  `;

  const editButtonElement = document.createElement('button');

  editButtonElement.classList = 'edit-button';
  editButtonElement.addEventListener('click', editClickHandler);

  const deleteButtonElement = document.createElement('button');

  deleteButtonElement.classList = 'delete-button';
  deleteButtonElement.addEventListener('click', deleteClickHandler);

  const archiveButtonElement = document.createElement('button');

  archiveButtonElement.className = isArchived
    ? 'from-archive-button'
    : 'to-archive-button';
  archiveButtonElement.addEventListener('click', archiveClickHandler);

  noteElement.append(
    wrapIntoTd(editButtonElement),
    wrapIntoTd(archiveButtonElement),
    wrapIntoTd(deleteButtonElement)
  );

  return noteElement;
}

const CODES = {
  A: 65,
  Z: 90,
};

function toCell() {
  return `
    <div class="table__cell" contenteditable="true"></div>
  `;
}

function toColumn(letter) {
  return `
    <div class="table__column">${letter}</div>
  `;
}

function createRow(content, number = '') {
  return `
    <div class='table__row'>
      <div class='table__row-info'>${number}</div>
      <div class='table__row-data'>${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 30) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const columns = new Array(columnsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(columns));

  for (let i = 0; i < rowsCount; i++ ) {
    const cells = new Array(columnsCount)
        .fill('')
        .map(toCell)
        .join('');

    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}

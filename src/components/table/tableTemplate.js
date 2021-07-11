const CODES = {
  A: 65,
  Z: 90,
};

function toCell(_, columnNumber) {
  return `
    <div class="table__cell" contenteditable="true" 
      data-column=${columnNumber}></div>
  `;
}

function toColumn(letter, columnNumber) {
  return `
    <div class="table__column" data-type="resizable" 
      data-column=${columnNumber}>
      ${letter}
      <div class="table__column-resize" data-resize="column"></div>
    </div>
    
  `;
}

function createRow(content, number = '') {
  const resize = number ?
    '<div class="table__row-resize" data-resize="row"></div>' : '';
  return `
    <div class='table__row' data-type="resizable" 
    data-row=${number ? number : 0}>
      <div class='table__row-info'>
        ${number}
        ${resize}
      </div>
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
        .fill(i + 1)
        .map(toCell)
        .join('');

    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}

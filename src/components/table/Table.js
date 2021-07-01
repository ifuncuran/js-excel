import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './tableTemplate';

export class Table extends ExcelComponent {
  static className = 'table';
  toHTML() {
    return createTable();
  }
}

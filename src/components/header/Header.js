import { ExcelComponent } from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'header';

  toHTML() {
    return `
    <input type="text" class="header__title" value="Новая таблица" />
          <div>
            <div class="header__button">
              <i class="material-icons">delete</i>
            </div>
            <div class="header__button">
              <i class="material-icons">exit_to_app</i>
            </div>
          </div>
    `;
  }
}

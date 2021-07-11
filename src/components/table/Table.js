import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './tableTemplate';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mousemove', 'mouseup'],
    });
    this.isResizing = false;
    this.resizeElement = {};
    this.resizeElementDefaultWidth = 0;
    this.startResizing = 0;
  }

  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $resizingElement = $resizer.closest('[data-type="resizable"]');
      const coords = $resizingElement.getCoords();
      let value;
      const type = event.target.dataset.resize;
      const sideProp = type === 'column' ? 'bottom' : 'right';
      $resizer.css({ opacity: 1, [sideProp]: '-5000px' });

      document.onmousemove = (e) => {
        if (type === 'column') {
          const delta = e.pageX - coords.right;
          value = coords.width + delta;
          $resizer.css({
            right: -delta + 'px',
          });
        } else {
          const delta = e.pageY - coords.bottom;
          value = coords.height + delta;
          $resizer.css({
            bottom: -delta + 'px',
          });
        }
      };

      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
        if (type === 'column') {
          this.$root.
              findAll(`[data-column="${$resizingElement
                  .data.column}"]`)
              .forEach((el) => {
                el.style.width = value + 'px';
              });
        } else {
          $resizingElement.css({ height: `${value}px` });
        }
        $resizer.css({
          opacity: 0,
          bottom: 0,
          right: 0,
        });
      };
    }
  }
}

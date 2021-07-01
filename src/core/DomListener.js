import { capitalize } from '@core/utils';

export class DomListener {
  constructor($root, listenersTypes = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener');
    }
    this.$root = $root;
    this.listenersTypes = listenersTypes;
  }

  // другое решение:
  //   initDOMListeners() {
  //     this.listenersTypes.forEach((type) => {
  //       const method = getMethodName(type);
  //       if (!this[method]) {
  //         const name = this.name || '';
  //         throw new Error(
  //             `Method ${method} is not implemented in ${name} Component`
  //         );
  //       }
  //       const boundListener = this[method].bind(this);
  //       this.boundListeners.push({ type, boundListener });
  //       this.$root.on(type, boundListener);
  //     });
  //   }

  //   removeDOMListeners() {
  //     this.boundListeners.forEach(({ type, boundListener }) => {
  //       this.$root.off(type, boundListener);
  //     });
  //   }
  // }

  initDOMListeners() {
    this.listenersTypes.forEach((type) => {
      const method = getMethodName(type);
      if (!this[method]) {
        const name = this.name || '';
        throw new Error(
            `Method ${method} is not implemented in ${name} Component`
        );
      }
      this[method] = this[method].bind(this);
      this.$root.on(type, this[method]);
    });
  }

  removeDOMListeners() {
    this.listenersTypes.forEach((type) => {
      const method = getMethodName(type);
      this.$root.off(type, this[method]);
    });
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}

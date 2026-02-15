/**
 * Listens to changes to an HTML input element, calls a callback with the new value
 */
export default class InputListener {
  #inputElement: HTMLInputElement | undefined;
  #listener: ((event: Event) => void) | undefined;

  constructor(
    inputElement: HTMLInputElement,
    onInput: (value: string) => void,
  ) {
    if (!inputElement) return;

    this.#inputElement = inputElement;
    this.#listener = (event: Event) => {
      onInput((event.target as HTMLInputElement).value);
    };

    this.#inputElement.addEventListener('input', this.#listener);
  }

  destroy() {
    if (!this.#inputElement || !this.#listener) return;
    this.#inputElement.removeEventListener('input', this.#listener);
  }
}

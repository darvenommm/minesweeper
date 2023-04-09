import {
  closingButtonClickHandler,
  modalOutClickHandler,
  bodyKeydownHandler,
} from './listeners';

const OPEN_MODAL_CLASS = 'modal--open';

const modal = document.querySelector<HTMLElement>('.modal');
const textElement = modal?.querySelector<HTMLElement>('.modal__text');
const closingButton = modal?.querySelector<HTMLButtonElement>('.modal__close-button');

if (!modal || !textElement || !closingButton) {
  throw new Error('Not found need element!');
}

type FocusELementAfterClose = HTMLButtonElement | HTMLInputElement;

let focusElementAfterClose: FocusELementAfterClose | null = null;
const updateFocusElementAfterClose = (newElement: FocusELementAfterClose): void => {
  focusElementAfterClose = newElement;
};
const resetFocusElementAfterClose = (): void => void (focusElementAfterClose = null);

const addHandlers = (): void => {
  closingButton.addEventListener('click', closingButtonClickHandler);
  modal.addEventListener('click', modalOutClickHandler);
  document.body.addEventListener('keydown', bodyKeydownHandler);
};

const removeHandlers = (): void => {
  closingButton.removeEventListener('click', closingButtonClickHandler);
  modal.removeEventListener('click', modalOutClickHandler);
  document.body.removeEventListener('keydown', bodyKeydownHandler);
};

export const openModal = (
  text: string,
  focusElementAfterClose?: FocusELementAfterClose | null,
): void => {
  addHandlers();
  textElement.textContent = text;
  document.body.style.overflow = 'hidden';

  resetFocusElementAfterClose();
  if (focusElementAfterClose) {
    updateFocusElementAfterClose(focusElementAfterClose);
  }

  modal.classList.add(OPEN_MODAL_CLASS);
  closingButton.focus();
};

export const closeModal = (): void => {
  removeHandlers();
  textElement.textContent = '';
  document.body.style.overflow = '';

  modal.classList.remove(OPEN_MODAL_CLASS);
  focusElementAfterClose?.focus();
};

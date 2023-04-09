import { closeModal } from './main';

const modal = document.querySelector<HTMLElement>('.modal');

if (!modal) {
  throw new Error('Not found need element!');
}

export const closingButtonClickHandler = (event: MouseEvent): void => {
  event.preventDefault();

  closeModal();
};

export const modalOutClickHandler = (event: MouseEvent): void => {
  event.preventDefault();

  if (event.target === modal) {
    closeModal();
  }
};

export const bodyKeydownHandler = (event: KeyboardEvent): void => {
  if (event.key.startsWith('Esc')) {
    closeModal();
  }
};

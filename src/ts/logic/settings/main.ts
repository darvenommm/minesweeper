import type { ISettings } from '../../types/settings';
import type { SubmitCallback } from './types/submit-callback';

const START_WIDTH_VALUE = 0;
const START_HEIGHT_VALUE = 0;
const START_BOMB_COUNT_VALUE = 0;

const settingsForm = document.querySelector('.settings__form');
const widthInput = settingsForm?.querySelector('.settings__width');
const heightInput = settingsForm?.querySelector('.settings__height');
const bombCountInput = settingsForm?.querySelector('.settings__bombCount');

let submitCallback: SubmitCallback | null = null;
const setNewSubmitCallback = (newCallback: SubmitCallback): void => {
  submitCallback = newCallback;
};
const removeSubmitCallback = (): void => void (submitCallback = null);

const getSettings = (): ISettings => {
  const width = (widthInput instanceof HTMLInputElement)
    ? Number(widthInput.value)
    : START_WIDTH_VALUE;
  const height = (heightInput instanceof HTMLInputElement)
    ? Number(heightInput.value)
    : START_HEIGHT_VALUE;
  const bombCount = (bombCountInput instanceof HTMLInputElement)
    ? Number(bombCountInput.value)
    : START_BOMB_COUNT_VALUE;

  return {
    width,
    height,
    bombCount,
  };
};

const settingsFormSubmitHandler = (event: SubmitEvent): void => {
  event.preventDefault();

  submitCallback?.(getSettings());
};
const addSettingsFormSubmitHandler = (): void => {
  if (settingsForm instanceof HTMLFormElement) {
    settingsForm.addEventListener('submit', settingsFormSubmitHandler);
  }
};
const removeSettingsFormSubmitHandler = (): void => {
  if (settingsForm instanceof HTMLFormElement) {
    settingsForm.removeEventListener('submit', settingsFormSubmitHandler);
  }
};

export const addCallbackForSettingsFormSubmit = (
  callback: SubmitCallback
): void => {
  removeSettingsFormSubmitHandler();
  removeSubmitCallback();

  if (callback) {
    setNewSubmitCallback(callback);
  }

  addSettingsFormSubmitHandler();
};

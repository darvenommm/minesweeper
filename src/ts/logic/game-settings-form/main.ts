import type { IGameSettings } from '../../types/settings';
import type { SubmitCallback } from './types';

const DEFAULT_WIDTH_VALUE = 5;
const DEFAULT_HEIGHT_VALUE = 5;
const DEFAULT_BOMB_COUNT_VALUE = 5;

const settingsForm = document.querySelector<HTMLFormElement>('.settings__form');
if (!settingsForm) {
  throw new Error('Not found settings form in HTML! This error is in game-settings-module');
}
const widthInput = settingsForm.querySelector<HTMLInputElement>('.settings__width');
const heightInput = settingsForm.querySelector<HTMLInputElement>('.settings__height');
const bombCountInput = settingsForm.querySelector<HTMLInputElement>('.settings__bomb');

// callback, which is running after the form submit
let submitCallback: SubmitCallback | null = null;
const resetSubmitCallback = (): void => void (submitCallback = null);
const setNewSubmitCallback = (newCallback: SubmitCallback): void => {
  submitCallback = newCallback;
};

const getSettings = (): IGameSettings => ({
  width: widthInput ? Number(widthInput.value) : DEFAULT_WIDTH_VALUE,
  height: heightInput ? Number(heightInput.value) : DEFAULT_HEIGHT_VALUE,
  bombCount: bombCountInput ? Number(bombCountInput.value) : DEFAULT_BOMB_COUNT_VALUE,
});

const settingsFormSubmitHandler = (event: SubmitEvent): void => {
  event.preventDefault();

  submitCallback?.(getSettings());
};
const addSettingsFormSubmitHandler = (): void => {
  settingsForm.addEventListener('submit', settingsFormSubmitHandler);
};
const removeSettingsFormSubmitHandler = (): void => {
  settingsForm.removeEventListener('submit', settingsFormSubmitHandler);
};

export const addCallbackForSettingsFormSubmit = (
  callback: SubmitCallback
): void => {
  // if this function is started again
  removeSettingsFormSubmitHandler();
  resetSubmitCallback();

  setNewSubmitCallback(callback);
  addSettingsFormSubmitHandler();
};

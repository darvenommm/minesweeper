import { addCallbackForSettingsFormSubmit } from './logic/game-settings-form';
import { createGame } from './logic/game';

addCallbackForSettingsFormSubmit((settings) => {
  createGame(settings);
});

import { addCallbackForSettingsFormSubmit } from './logic/settings';

console.log('Hello world');

addCallbackForSettingsFormSubmit((settings) => {
  console.log(settings);
});

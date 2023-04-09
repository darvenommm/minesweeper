import { getCurrentGame, rerenderGameCell } from './main';
import { createOpenedCell, createOpenedCellWithBomb } from '../cell/main';
import { openModal } from '../../modal';

const createNewGameButton = document.querySelector<HTMLButtonElement>('.settings__submit');

const callbackForCellWithoutBomb = (
  widthIndex: number,
  heightIndex: number,
  countOfNearBombs: number,
): void => {
  const newOpenedElement = createOpenedCell(
    widthIndex,
    heightIndex,
    countOfNearBombs,
  );
  rerenderGameCell(widthIndex, heightIndex, newOpenedElement);
};

const callbackForCellWithBomb = (
  widthIndex: number,
  heightIndex: number,
): void => {
  const newOpenedElementWithBomb = createOpenedCellWithBomb(
    widthIndex,
    heightIndex,
  );
  rerenderGameCell(widthIndex, heightIndex, newOpenedElementWithBomb);
};

const callbackForLostGame = (): void => {
  openModal('You lost! Create the new game', createNewGameButton);
};

const callbackForWinGame = (): void => {
  openModal('You win! Great job', createNewGameButton);
};

export const gameBoardClickHandler = (event: MouseEvent): void => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const parentOfTarget = target.closest('.board__cell');
  if (!parentOfTarget || !(parentOfTarget instanceof HTMLElement)) {
    return;
  }

  const currentGame = getCurrentGame();
  if (!currentGame) {
    return;
  }

  currentGame.openCell(
    Number(parentOfTarget.dataset.widthIndex),
    Number(parentOfTarget.dataset.heightIndex),
    callbackForCellWithoutBomb,
    callbackForCellWithBomb,
    callbackForWinGame,
    callbackForLostGame,
  );
};

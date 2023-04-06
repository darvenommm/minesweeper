import { getCurrentGame, rerenderGameCell } from './main';
import { createOpenedCell, createOpenedCellWithBomb } from '../cell/main';

export const gameBoardClickHandler = (event: MouseEvent): void => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const parentOfTarget = target.closest('.board__cell');
  if (!parentOfTarget || !(parentOfTarget instanceof HTMLElement)) {
    return;
  }

  const widthIndex = Number(parentOfTarget.dataset.widthIndex);
  const heightIndex = Number(parentOfTarget.dataset.heightIndex);

  const currentGame = getCurrentGame();
  if (!currentGame || currentGame.isDefeated) {
    return;
  }

  const clickedCell = currentGame.openCell(widthIndex, heightIndex)

  if (clickedCell.hasMineWithoutFlag) {
    const newOpenedElementWithBomb = createOpenedCellWithBomb(widthIndex, heightIndex);
    rerenderGameCell(widthIndex, heightIndex, newOpenedElementWithBomb);
    currentGame.makeGameDefeated();
  } else {
    const newOpenedElement = createOpenedCell(
      widthIndex,
      heightIndex,
      currentGame.getCellCountOfNearBombs(widthIndex, heightIndex)!,
    );
    rerenderGameCell(widthIndex, heightIndex, newOpenedElement);
  }
};

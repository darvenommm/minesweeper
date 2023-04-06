import { Game } from '../entities/game';
import { createCell } from '../cell/main';
import { gameBoardClickHandler } from './listeners';

const gameBoardContainer = document.querySelector<HTMLUListElement>('.board__cells');
const gameLineContainer = document.querySelector<HTMLTemplateElement>('#cell-line')
  ?.content.querySelector<HTMLLIElement>('.board__line');

if (!gameBoardContainer) {
  throw new Error('Not found game container!');
} else if (!gameLineContainer) {
  throw new Error('Not found game line container');
}

const showGameBoardContainer = (): void => {
  gameBoardContainer
    .closest('.board__container')
    ?.classList.add('board__container--opened');
};

const cleanGameBoardContainer = (): void => {
  gameBoardContainer.textContent = '';
};

const renderGameBoardCells = (game: Game): void => {
  const width = game.width;
  const height = game.height;

  for (let i = 0; i < height; ++i) {
    const newLine = gameLineContainer.cloneNode(true) as typeof gameLineContainer;

    for (let j = 0; j < width; ++j) {
      const newCellElement = createCell(j, i);

      newLine.appendChild(newCellElement);
    }

    gameBoardContainer.appendChild(newLine);
  }
};

const addGameBoardClickHandler = (): void => {
  gameBoardContainer.addEventListener('click', gameBoardClickHandler);
};
const removeGameBoardClickHandler = (): void => {
  gameBoardContainer.removeEventListener('click', gameBoardClickHandler);
};

let currentGame: Game | null = null;
const setNewCurrentGame = (newGame: Game): void => void (currentGame = newGame);
const resetCurrentGame = (): void => void (currentGame = null);
export const getCurrentGame = (): Game | null => currentGame;

export const rerenderGameCell = (
  widthIndex: number,
  heightIndex: number,
  newElement: HTMLElement,
): void => {
  const game = getCurrentGame();
  if (!game) {
    return;
  }

  const newCellContainer = gameBoardContainer
    .children[heightIndex]
    .children[widthIndex];

  newCellContainer.replaceWith(newElement);
};

export const startGame = (game: Game): void => {
  // this function is started again
  removeGameBoardClickHandler();
  resetCurrentGame();

  setNewCurrentGame(game);
  addGameBoardClickHandler();

  cleanGameBoardContainer();
  renderGameBoardCells(currentGame!);
  showGameBoardContainer();
};

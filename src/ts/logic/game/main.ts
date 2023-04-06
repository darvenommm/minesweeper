import { Game } from './entities/game';
import { startGame } from './board/main';

import { IGameSettings } from '../../types/settings';

export const createGame = (settings: IGameSettings): void => {
  const game = new Game(
    settings.width,
    settings.height,
    settings.bombCount,
  );

  startGame(game);
};

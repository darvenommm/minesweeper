import { Cell } from './cell';
import type {
  Cells,
  CellsLine,
  CallbackForCellWithBomb,
  CallbackForCellWithoutBomb,
} from '../types';

const MIN_WIDTH_VALUE = 2;
const MIN_HEIGHT_VALUE = 2;

/*
  Requirements:

  width >= 2
  height >= 2
  bombCount <= (width * height) - 1
*/
export class Game {
  private readonly _width: number;
  private readonly _height: number;
  private readonly _bombCount: number;
  private _cells: Cells | null;
  private _isWinned: boolean;
  private _isDefeated: boolean;

  constructor (width: number, height: number, bombCount: number) {
    this._width = (width >= MIN_WIDTH_VALUE) ? width : MIN_WIDTH_VALUE;
    this._height = (height >= MIN_HEIGHT_VALUE) ? height : MIN_HEIGHT_VALUE;
    const multi = width * height;
    this._bombCount = (bombCount < multi) ? bombCount : (multi - 1);

    this._cells = null;
    this._isWinned = false;
    this._isDefeated = false;
  }

  // getters
  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  public get bombCount(): number {
    return this._bombCount;
  }

  public get isDefeated(): boolean {
    return this._isDefeated;
  }

  public get isWinned(): boolean {
    return this._isWinned;
  }

  // public
  public openCell = (
    widthIndex: number,
    heightIndex: number,
    callbackForCellWithoutBomb: CallbackForCellWithoutBomb,
    callbackForCellWithBomb: CallbackForCellWithBomb,
  ): void => {
    if (!this._cells) {
      this._cells = this._createFilledCells(widthIndex, heightIndex);
    }

    const currentCell = this._getCell(widthIndex, heightIndex)!;

    if (currentCell.hasMineWithoutFlag) {
      callbackForCellWithBomb(widthIndex, heightIndex);
      this._makeGameDefeated();

      return;
    }

    if (currentCell.hasFlag) {
      return;
    }

    this._openNearCellsOrCurrent(
      widthIndex,
      heightIndex,
      callbackForCellWithoutBomb,
    );
  };

  // private
  private _openNearCellsOrCurrent = (
    widthIndex: number,
    heightIndex: number,
    callbackForCellWithoutBomb: CallbackForCellWithoutBomb,
  ): void => {
    const currentCell = this._getCell(widthIndex, heightIndex);
    if (!currentCell || currentCell.hasMine || currentCell.hasFlag || currentCell.isOpened) {
      return;
    }

    const countOfNearBomb = this._getCountOfNearBomb(widthIndex, heightIndex);
    currentCell.open();
    callbackForCellWithoutBomb(widthIndex, heightIndex, countOfNearBomb);

    if (countOfNearBomb > 0) {
      callbackForCellWithoutBomb(widthIndex, heightIndex, countOfNearBomb);
      return;
    }

    this._goThroughNearBombs(
      widthIndex,
      heightIndex,
      (currentWidthIndex, currentHeightIndex): void => {
        this._openNearCellsOrCurrent(
          currentWidthIndex,
          currentHeightIndex,
          callbackForCellWithoutBomb,
        );
      },
    );
  };

  private _getCountOfNearBomb = (
    widthIndex: number,
    heightIndex: number
  ): number => {
    let sum = 0;
    this._goThroughNearBombs(
      widthIndex,
      heightIndex,
      (currentWidthIndex, currentHeightIndex): void => {
        const currentCell = this._getCell(currentWidthIndex, currentHeightIndex);
        sum += currentCell && currentCell.hasMine ? 1 : 0;
      },
    );

    return sum;
  };

  private _goThroughNearBombs = (
    widthIndex: number,
    heightIndex: number,
    callback: (
      currentWidthIndex: number,
      currentHeightIndex: number,
    ) => void
  ): void => {
    for (let i = -1; i <= 1; ++i) {
      for (let j = -1; j <= 1; ++j) {
        if (i === 0 && j === 0) {
          continue;
        }

        callback(widthIndex + j, heightIndex + i);
      }
    }
  };

  private _getCell = (widthIndex: number, heightIndex: number): Cell | void => {
    if (!this._cells) {
      return;
    }

    return this._cells[heightIndex]?.[widthIndex];
  };

  private _makeGameDefeated = (): void => {
    this._isDefeated = true;
  };

  private _createFilledCells = (
    startCellWidthIndex: number,
    startCellHeightIndex: number,
  ): Cells => {
    const cells: Cells = Array.from({ length: this._height });
    const countOfCells = this._width * this._height;
    let countOfRemainingBombs = this._bombCount;
    let countOfRemainingCells = countOfCells - 1;

    for (let i = 0; i < this._height; ++i) {
      const cellsLine: CellsLine = Array.from({ length: this._width });

      for (let j = 0; j < this._width; ++j) {
        if (j === startCellWidthIndex && i === startCellHeightIndex) {
          cellsLine[j] = new Cell(false);
          continue;
        }

        const chanceOfMine = countOfRemainingBombs / countOfRemainingCells;
        const randomNumber = Math.random();
        let hasMine = false;

        if (randomNumber <= chanceOfMine) {
          hasMine = true;
          --countOfRemainingBombs;
        }

        cellsLine[j] = new Cell(hasMine);
        --countOfRemainingCells;
      }

      cells[i] = cellsLine;
    }

    return cells;
  };
};

import { Cell } from './cell';

type CellsLine = Cell[];
type Cells = CellsLine[];

const MIN_WIDTH_VALUE = 2;
const MIN_HEIGHT_VALUE = 2;

/*
  requirements:

  width >= 2
  height >= 2
  bombCount <= (width * height) - 1

  if you want to use all game's methods you need to open one cell with openCell()!
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

  // public
  public getCellCountOfNearBombs = (widthIndex: number, heightIndex: number): number | null => {
    if (!this._cells) {
      return null;
    }

    let result = 0;

    for (let i = -1; i <= 1; ++i) {
      for (let j = -1; j <= 1; ++j) {
        if (i === 0 && j === 0) {
          continue;
        }

        if (this._getCell(widthIndex - j, heightIndex - i)?.hasMine) {
          ++result;
        }
      }
    }

    return result;
  };

  public openCell = (widthIndex: number, heightIndex: number): Cell => {
    if (!this._cells) {
      this._cells = this._createFilledCells(widthIndex, heightIndex);
    }

    return this._getCell(widthIndex, heightIndex)!;
  };

  public makeGameDefeated = (): void => {
    this._isDefeated = true;
  };

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

  // private
  private _getCell = (widthIndex: number, heightIndex: number): Cell | null => {
    if (!this._cells) {
      return null;
    }

    return this._cells[heightIndex]?.[widthIndex] || null;
  };

  private _createFilledCells = (
    firstCellWidthIndex: number,
    firstCellHeightIndex: number,
  ): Cells => {
    const cells: Cells = Array.from({ length: this._height });
    const countOfCells = this._width * this._height;
    let countOfRemainingBombs = this._bombCount;
    let countOfRemainingCells = countOfCells - 1;

    for (let i = 0; i < this._height; ++i) {
      const cellsLine: CellsLine = Array.from({ length: this._width });

      for (let j = 0; j < this._width; ++j) {
        if (j === firstCellWidthIndex && i === firstCellHeightIndex) {
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

import { Cell } from './cell';

type CellsLine = Cell[];
type Cells = CellsLine[];

export class Game {
  private readonly _cells: Cells;

  constructor (width: number, height: number, bombCount: number) {
    this._cells = this._createCells(width, height, bombCount);
  }

  // public
  public getCell = (widthIndex: number, heightIndex: number): Cell | null => {
    return this._cells[heightIndex]?.[widthIndex] || null;
  };

  public getCellCountOfNearBombs = (widthIndex: number, heightIndex: number): number => {
    let result = 0;

    for (let i = -1; i <= 1; ++i) {
      for (let j = -1; j <= 1; ++j) {
        if (i === 0 && j === 0) {
          continue;
        }

        if (this.getCell(widthIndex - j, heightIndex - i)?.hasMine) {
          ++result;
        }
      }
    }

    return result;
  };

  // getters
  public get width(): number {
    return this._cells[0].length;
  };

  public get height(): number {
    return this._cells.length;
  };

  // protected
  protected _createCells = (
    width: number,
    height: number,
    bombCount: number,
  ): Cells => {
    const cells: Cells = Array.from({ length: height });
    const countOfCells = width * height;
    let countOfRemainingBombs = bombCount;
    let countOfRemainingCells = countOfCells;

    for (let i = 0; i < height; ++i) {
      const cellsLine: CellsLine = Array.from({ length: width });

      for (let j = 0; j < width; ++j) {
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

import { Cell } from '../entities/cell';

export type CellsLine = Cell[];
export type Cells = CellsLine[];

export type CallbackForCellWithBomb = (
  widthIndex: number,
  heightIndex: number,
) => void;

export type CallbackForCellWithoutBomb = (
  widthIndex: number,
  heightIndex: number,
  countOfNearBombs: number,
) => void

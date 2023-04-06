export class Cell {
  private readonly _hasMine: boolean;
  private _isOpened: boolean;
  private _hasFlag: boolean;

  public constructor (hasMine: boolean) {
    this._hasMine = hasMine;
    this._isOpened = false;
    this._hasFlag = false;
  }

  // public
  public open = (): Cell => {
    this._isOpened = true;

    return this;
  };

  public toggleFlag = (): Cell => {
    this._hasFlag = !this._hasFlag;

    return this;
  };

  // getters
  public get hasMine(): boolean {
    return this._hasMine;
  }

  public get isOpened(): boolean {
    return this._isOpened;
  }

  public get hasFlag(): boolean {
    return this._hasFlag;
  }

  public get hasMineWithoutFlag(): boolean {
    return this._hasMine && !this._hasFlag;
  }
}

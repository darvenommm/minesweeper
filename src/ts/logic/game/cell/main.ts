const cellTemplateElement = document.querySelector<HTMLTemplateElement>('#cell');
const cellTemplate = cellTemplateElement
  ? cellTemplateElement.content.querySelector<HTMLElement>('.board__cell')
  : null;

if (!cellTemplate) {
  throw new Error('Not found cell template in HTML! This error is in game module');
}

export const createCell = (
  widthIndex: number,
  heightIndex: number,
): HTMLElement => {
  const newCell = cellTemplate.cloneNode(true) as typeof cellTemplate;
  newCell.dataset.widthIndex = String(widthIndex);
  newCell.dataset.heightIndex = String(heightIndex);

  return newCell;
};

export const createOpenedCell = (
  widthIndex: number,
  heightIndex: number,
  countOfNearBombs: number,
): HTMLElement => {
  const newCell = createCell(widthIndex, heightIndex);
  newCell.classList.add('board__cell--opened');

  const countOfNearBombsContainer = newCell.querySelector<HTMLElement>('.board__cell-value');
  if (countOfNearBombsContainer) {
    countOfNearBombsContainer.textContent = String(countOfNearBombs);
  }

  return newCell;
};

export const createOpenedCellWithBomb = (
  widthIndex: number,
  heightIndex: number,
): HTMLElement => {
  const newCell = createCell(widthIndex, heightIndex);
  newCell.classList.add('board__cell--opened', 'board__cell--with-mine');

  return newCell;
};

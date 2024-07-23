export const buildLayout = (config: {
  width: number;
  height: number;
  mines: number;
}): { value: number | "X"; isClicked: boolean; isFlagged: boolean }[][] => {
  const basicTile = { value: 0, isClicked: false, isFlagged: false };
  const layout = [];
  for (let row = 0; row < config.height; row++) {
    layout.push([]);
    for (let column = 0; column < config.width; column++) {
      layout[row][column] = { ...basicTile };
    }
  }
  let minesLeft = config.mines;
  while (minesLeft > 0) {
    let randomRow = Math.floor(Math.random() * config.height);
    let randomColumn = Math.floor(Math.random() * config.width);
    if (layout[randomRow][randomColumn].value !== "X") {
      layout[randomRow][randomColumn].value = "X";
      minesLeft--;
    }
  }
  for (let row = 0; row < config.height; row++) {
    for (let column = 0; column < config.width; column++) {
      let value = 0;
      layout[row - 1]?.[column - 1]?.value === "X" ? value++ : null;
      layout[row - 1]?.[column]?.value === "X" ? value++ : null;
      layout[row - 1]?.[column + 1]?.value === "X" ? value++ : null;
      layout[row]?.[column - 1]?.value === "X" ? value++ : null;
      layout[row]?.[column + 1]?.value === "X" ? value++ : null;
      layout[row + 1]?.[column - 1]?.value === "X" ? value++ : null;
      layout[row + 1]?.[column]?.value === "X" ? value++ : null;
      layout[row + 1]?.[column + 1]?.value === "X" ? value++ : null;
      layout[row][column].value === "X"
        ? null
        : (layout[row][column].value = value);
    }
  }
  return layout;
};

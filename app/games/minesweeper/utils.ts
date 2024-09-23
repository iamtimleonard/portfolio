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
    if (layout[randomRow][randomColumn].value !== "💣") {
      layout[randomRow][randomColumn].value = "💣";
      minesLeft--;
    }
  }
  for (let row = 0; row < config.height; row++) {
    for (let column = 0; column < config.width; column++) {
      let value = 0;
      layout[row - 1]?.[column - 1]?.value === "💣" ? value++ : null;
      layout[row - 1]?.[column]?.value === "💣" ? value++ : null;
      layout[row - 1]?.[column + 1]?.value === "💣" ? value++ : null;
      layout[row]?.[column - 1]?.value === "💣" ? value++ : null;
      layout[row]?.[column + 1]?.value === "💣" ? value++ : null;
      layout[row + 1]?.[column - 1]?.value === "💣" ? value++ : null;
      layout[row + 1]?.[column]?.value === "💣" ? value++ : null;
      layout[row + 1]?.[column + 1]?.value === "💣" ? value++ : null;
      layout[row][column].value === "💣"
        ? null
        : (layout[row][column].value = value);
    }
  }
  return layout;
};

export const generateMines = (
  width: number,
  height: number,
  mines: number,
  clickedIndexX: number,
  clickedIndexY: number
) => {
  let mineMap = new Array(height);
  for (let i = 0; i < width; i++) {
    mineMap[i] = new Array(width).fill(0);
  }
  let mineCount = 0;
  while (mineCount < mines) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    if (x === clickedIndexX && y === clickedIndexY) continue;
    if (mineMap[x][y] === 0) {
      mineCount++;
      mineMap[x][y] = 1;
    }
  }
  return mineMap;
};

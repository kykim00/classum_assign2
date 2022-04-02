export const countMines = (
  clickedIndexX: number,
  clickedIndexY: number,
  minesMap: number[][],
  width: number,
  height: number
) => {
  console.log(minesMap);
  if (minesMap[clickedIndexX][clickedIndexY] === 1) {
    return "*";
  }
  let count = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i === 0 && j === 0) continue;
      if (
        clickedIndexX + i >= 0 &&
        clickedIndexX + i < width &&
        clickedIndexY + j >= 0 &&
        clickedIndexY + j < height
      ) {
        if (minesMap[clickedIndexX + i][clickedIndexY + j] === 1) {
          count++;
        }
      }
    }
  }
  return count + "";
};

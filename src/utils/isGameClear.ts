export const isGameClear = (
  board: string[][] | number[][],
  minesMap: number[][]
) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (minesMap[i][j] === 1) {
        if (!(board[i][j] === "?")) {
          return false;
        }
      }
    }
  }
  return true;
};

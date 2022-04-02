export const findMine = (board: string[][] | number[][]) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "*") {
        return true;
      }
    }
  }
  return false;
};

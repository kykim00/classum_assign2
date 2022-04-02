import { useSelector } from "react-redux";
import { gameSelector } from "../stores/gameSetting";
import { Cell } from "./Cell";

export const Board = () => {
  const { width, height } = useSelector(gameSelector);

  const renderBoard = () => {
    const board = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(<Cell xPos={i} yPos={j}></Cell>);
      }
      board.push(<div key={i}>{row}</div>);
    }
    return board;
  };

  return <>{renderBoard()}</>;
};

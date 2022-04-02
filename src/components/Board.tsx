import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearGame, gameOver, gameSelector } from "../stores/gameSetting";
import { Cell } from "./Cell";
import { Modal } from "./common/Modal";

export const Board = () => {
  const { width, height, board, minesMap } = useSelector(gameSelector);
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();

  const isGameClear = () => {
    if (board.length === 0) return;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (board[i][j] === "?") {
          if (!(minesMap[i][j] === 1)) {
            dispatch(gameOver());
            return false;
          }
        }
      }
    }
    console.log("running");
    dispatch(clearGame());
    return true;
  };

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

  useEffect(() => {
    if (board.length === 0) return;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (board[i][j] === "") return;
      }
    }
    if (isGameClear()) setIsModal(true);
  }, [board]);

  return (
    <div>
      <div>{renderBoard()}</div>
      {isModal && (
        <Modal>
          <h1>CLEAR !!</h1>
          <button onClick={() => setIsModal(false)}>닫기</button>
        </Modal>
      )}
    </div>
  );
};

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearGame, gameOver, gameSelector } from "../stores/gameSetting";
import { allBoardChecked } from "../utils/allBoardChecked";
import { findMine } from "../utils/findMine";
import { isGameClear } from "../utils/isGameClear";
import { Cell } from "./Cell";
import { Modal } from "./common/Modal";

export const Board = () => {
  const { width, height, board, minesMap, gameState } =
    useSelector(gameSelector);
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();

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

  const onCloseModal = () => {
    setIsModal(false);
  };

  useEffect(() => {
    if (board.length === 0) return;
    if (findMine(board)) {
      setIsModal(true);
      return;
    }
    if (allBoardChecked(board)) {
      if (isGameClear(board, minesMap)) {
        dispatch(clearGame());
      } else {
        dispatch(gameOver());
      }
      setIsModal(true);
    }
  }, [board]);

  return (
    <div>
      <div>{renderBoard()}</div>
      {isModal && (
        <Modal>
          <h1>{gameState === "clear" ? "CLEAR !! " : "LOSE :( "}</h1>
          <button onClick={onCloseModal}>닫기</button>
        </Modal>
      )}
    </div>
  );
};

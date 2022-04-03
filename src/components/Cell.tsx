/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  gameOver,
  gameSelector,
  setBoard,
  setBoardCell,
  addFlags,
  removeFlags,
  setMinesMap,
  startGame,
} from "../stores/gameSetting";
import { countMines } from "../utils/countMines";
import { generateMines } from "../utils/generateMines";

interface CellProps {
  xPos: number;
  yPos: number;
}
export const Cell = ({ xPos, yPos }: CellProps) => {
  const { width, height, mines, gameState, minesMap, flags, board } =
    useSelector(gameSelector);
  const dispatch = useDispatch();
  const [value, setValue] = useState<string | number>("");

  const onClick = () => {
    if (gameState === "playing") {
      if (minesMap[xPos][yPos] === 1) {
        dispatch(setBoardCell({ xPos, yPos, value: "*" }));
        dispatch(gameOver());
      } else {
        dispatch(
          setBoardCell({
            xPos,
            yPos,
            value: countMines(xPos, yPos, minesMap, width, height),
          })
        );
        if (board[xPos][yPos] === "?") dispatch(removeFlags());
      }
    } else if (gameState === "ready") {
      let temp = generateMines(width, height, mines, xPos, yPos);
      dispatch(setMinesMap({ minesMap: temp }));
      dispatch(setBoard());
      dispatch(
        setBoardCell({
          xPos,
          yPos,
          value: countMines(xPos, yPos, temp, width, height),
        })
      );
      dispatch(startGame());
    }
  };

  const onContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (flags >= mines) {
      alert("사용 가능 깃발의 수를 초과했습니다.");
      return;
    }
    if (gameState === "playing") {
      dispatch(setBoardCell({ xPos, yPos, value: "?" }));
    }
    dispatch(addFlags());
  };

  useEffect(() => {
    if (board.length === 0) return;
    setValue(board[xPos][yPos]);
  }, [board]);

  return (
    <CellBox onClick={onClick} onContextMenu={onContextMenu}>
      {value}
    </CellBox>
  );
};

const CellBox = styled.button`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin: 0 2px;
  border: 1px solid black;
`;

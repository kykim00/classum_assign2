import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { gameSelector } from "../stores/gameSetting";

export const GameStart = () => {
  const { width, height, mines } = useSelector(gameSelector);
  const [isGameStart, setIsGameStart] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameClear, setIsGameClear] = useState(false);

  const [minesMap, setMinesMap] = useState<number[][]>([]);
  let mineMapTemp: number[][] = [];
  const onClickFirstCell = (clickedIndexX: number, clickedIndexY: number) => {
    console.log(clickedIndexX, clickedIndexY);
    while (1) {
      mineMapTemp = generateMines(width, height, mines);
      if (mineMapTemp[clickedIndexX][clickedIndexY] === 0) {
        break;
      }
    }
    setMinesMap(mineMapTemp);
    setIsGameStart(true);
  };
  const onClickCell = () => {
    console.log("onClickCell");
  };
  const onClick = (e: any) => {
    const indexX = e.target.value.split("-")[0];
    const indexY = e.target.value.split("-")[1];
    if (!isGameStart) {
      onClickFirstCell(+indexX, +indexY);
    } else {
      onClickCell();
    }
  };
  const generateMines = (width: number, height: number, mines: number) => {
    let mineMap = new Array(height);
    for (let i = 0; i < width; i++) {
      mineMap[i] = new Array(width).fill(0);
    }
    let mineCount = 0;
    while (mineCount < mines) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      if (mineMap[x][y] === 0) {
        mineCount++;
        mineMap[x][y] = 1;
      }
    }

    console.log(mineMap);
    return mineMap;
  };
  const renderBoard = () => {
    const board = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(
          <Cell value={`${i}-${j}`} onClick={onClick} key={`${i}-${j}`}></Cell>
        );
      }
      board.push(<div key={i}>{row}</div>);
    }
    return board;
  };
  return <>{renderBoard()}</>;
};

const Cell = styled.button`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid black;
`;

import React, { SyntheticEvent, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { gameSelector } from "../stores/gameSetting";

export const GameStart = () => {
  const { width, height, mines } = useSelector(gameSelector);
  const [isGameStart, setIsGameStart] = useState(false);
  const onClickFirstCell = () => {
    generateMines(width, height, mines);
    setIsGameStart(true);
  };
  const onClickCell = () => {
    console.log("onClickCell");
  };
  const onClick = (e: any) => {
    console.log(e.target.value.split("-"));
    if (!isGameStart) {
      onClickFirstCell();
    } else {
      onClickCell();
    }
  };
  const generateMines = (width: number, height: number, mines: number) => {
    const mineMap = new Array(width * height).fill(0);
    const mineIndex: number[] = [];
    while (mineIndex.length < mines) {
      const index = Math.floor(Math.random() * (width * height));
      if (!mineIndex.includes(index)) {
        mineIndex.push(index);
      }
    }
    mineIndex.forEach((index) => {
      mineMap[index] = -1;
    });
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

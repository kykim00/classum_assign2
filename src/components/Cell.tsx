import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { gameSelector, setMinesMap, startGame } from "../stores/gameSetting";
import { countMines } from "../utils/countMines";
import { generateMines } from "../utils/generateMines";

interface CellProps {
  xPos: number;
  yPos: number;
}
export const Cell = ({ xPos, yPos }: CellProps) => {
  const [count, setCount] = useState("");
  const { width, height, mines, gameState, minesMap } =
    useSelector(gameSelector);
  const dispatch = useDispatch();
  const onClick = () => {
    if (gameState === "playing") {
      if (minesMap[xPos][yPos] === 1) {
        setCount("*");
        setTimeout(() => {
          setCount("");
        }, 1000);
      } else {
        setCount(countMines(xPos, yPos, minesMap, width, height));
      }
    } else if (gameState === "ready") {
      let temp = generateMines(width, height, mines, xPos, yPos);
      setCount(countMines(xPos, yPos, temp, width, height));
      dispatch(setMinesMap({ minesMap: temp }));
      dispatch(startGame());
    }
  };
  const onContextMenu = (e: any) => {
    e.preventDefault();
    if (gameState === "playing") {
      setCount("?");
    }
  };
  return (
    <CellBox onClick={onClick} onContextMenu={onContextMenu}>
      {count}
    </CellBox>
  );
};

const CellBox = styled.button`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid black;
`;

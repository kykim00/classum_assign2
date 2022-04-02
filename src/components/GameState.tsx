import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  gameSelector,
  resetGame,
  setBoard,
  setMinesMap,
} from "../stores/gameSetting";

export const GameState = () => {
  const { mines, gameState, board } = useSelector(gameSelector);
  const [leftMines, setLeftMines] = useState(mines);
  const [time, setTime] = useState(0);
  const dispatch = useDispatch();

  const onClickRestart = () => {
    dispatch(resetGame());
    dispatch(setMinesMap([]));
    dispatch(setBoard());
    setLeftMines(mines);
    setTime(0);
  };

  useEffect(() => {
    let timer: NodeJS.Timer | null = null;

    if (gameState === "playing") {
      timer = setInterval(() => setTime((prev) => prev + 1), 100);
    } else {
      if (timer) clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState]);

  useEffect(() => {
    setLeftMines(mines);
    setTime(0);
  }, [mines]);

  return (
    <div>
      <span>남은 지뢰 : {leftMines} </span>
      <span>게임 시간 : </span>
      <span>{("0" + Math.floor((time / 600) % 60)).slice(-2)}</span>
      <span>{("0" + Math.floor((time / 10) % 60)).slice(-2)}</span>
      <span>{"." + (time % 10)} 초</span>
      <button onClick={onClickRestart}>다시 시작</button>
    </div>
  );
};

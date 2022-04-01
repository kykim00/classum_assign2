import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customGame, gameSelector, setGame } from "../stores/gameSetting";

export const GameSetting = () => {
  const [isModal, setIsModal] = useState(false);
  const gameSetting = useSelector(gameSelector);
  const [customWidth, setCustomWidth] = useState(gameSetting.width);
  const [customHeight, setCustomHeight] = useState(gameSetting.height);
  const [customMines, setCustomMines] = useState(gameSetting.mines);
  console.log(gameSetting);
  const dispatch = useDispatch();
  const onChangeDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "Custom") setIsModal(true);

    dispatch(setGame({ difficulty: e.target.value }));
  };
  const onChangeCustomWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomWidth(+e.target.value);
  };
  const onChangeCustomHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomHeight(+e.target.value);
  };
  const onChangeCustomMines = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomMines(+e.target.value);
  };
  const onModalClose = () => {
    dispatch(
      customGame({
        difficulty: "Custom",
        width: customWidth,
        height: customHeight,
        mines: customMines,
      })
    );
    setIsModal(false);
  };
  return (
    <>
      <select onChange={onChangeDifficulty}>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Expert">Expert</option>
        <option value="Custom">Custom</option>
      </select>
      {isModal && (
        <div>
          <input
            type="number"
            value={customWidth}
            onChange={onChangeCustomWidth}
          />
          <input
            type="number"
            value={customHeight}
            onChange={onChangeCustomHeight}
          />
          <input
            type="number"
            value={customMines}
            onChange={onChangeCustomMines}
          />
          <button onClick={onModalClose}>OK</button>
        </div>
      )}
    </>
  );
};

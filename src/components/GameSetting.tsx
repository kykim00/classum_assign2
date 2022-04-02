import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  customGame,
  gameSelector,
  resetGame,
  setBoard,
  setGame,
} from "../stores/gameSetting";
import { Modal } from "./common/Modal";

export const GameSetting = () => {
  const [isModal, setIsModal] = useState(false);
  const gameSetting = useSelector(gameSelector);
  const [customWidth, setCustomWidth] = useState(gameSetting.width);
  const [customHeight, setCustomHeight] = useState(gameSetting.height);
  const [customMines, setCustomMines] = useState(gameSetting.mines);
  const dispatch = useDispatch();
  const onChangeDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "Custom") setIsModal(true);
    else setIsModal(false);
    dispatch(setGame({ difficulty: e.target.value }));
    dispatch(setBoard());
    dispatch(resetGame());
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
    if (customWidth * customHeight - customMines < 0) {
      alert("Mines number is too big");
      return;
    }
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
    <div>
      <select onChange={onChangeDifficulty}>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Expert">Expert</option>
        <option value="Custom">Custom</option>
      </select>
      {isModal && (
        <Modal>
          <div>
            <label>가로 길이</label>
            <input
              type="number"
              value={customWidth}
              onChange={onChangeCustomWidth}
            />
          </div>
          <div>
            <label>세로 길이</label>
            <input
              type="number"
              value={customHeight}
              onChange={onChangeCustomHeight}
            />
          </div>
          <div>
            <label>지뢰 수 </label>
            <input
              type="number"
              value={customMines}
              onChange={onChangeCustomMines}
            />
          </div>
          <div>
            <label>완료</label>
            <button onClick={onModalClose}>OK</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

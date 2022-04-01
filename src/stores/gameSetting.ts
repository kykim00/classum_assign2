import { createSlice } from "@reduxjs/toolkit";
import { rootState } from ".";

export interface GameSetting {
  difficulty: string;
  width: number;
  height: number;
  mines: number;
}

const initialState: GameSetting = {
  difficulty: "Beginner",
  width: 8,
  height: 8,
  mines: 10,
};

const gameSetting = createSlice({
  name: "gameSettingReducer",
  initialState,
  reducers: {
    setGame: (state, action) => {
      const { difficulty } = action.payload;
      state.difficulty = difficulty;
      if (difficulty === "Beginner") {
        state.width = 8;
        state.height = 8;
        state.mines = 10;
      } else if (difficulty === "Intermediate") {
        state.width = 16;
        state.height = 16;
        state.mines = 40;
      } else {
        state.width = 32;
        state.height = 16;
        state.mines = 99;
      }
    },
    customGame: (state, action) => {
      state.difficulty = action.payload.difficulty;
      state.width = action.payload.width;
      state.height = action.payload.height;
      state.mines = action.payload.mines;
    },
  },
});

export const { setGame, customGame } = gameSetting.actions;
export const gameSelector = (state: rootState) => state.gameSetting;
export default gameSetting;

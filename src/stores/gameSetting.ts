import { createSlice } from "@reduxjs/toolkit";
import { rootState } from ".";

export interface GameSetting {
  difficulty: string;
  width: number;
  height: number;
  mines: number;
  flags: number;
  gameState: string;
  minesMap: number[][];
  board: number[][] | string[][];
}

const initialState: GameSetting = {
  difficulty: "Beginner",
  width: 8,
  height: 8,
  mines: 10,
  flags: 0,
  gameState: "ready",
  minesMap: [],
  board: [],
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
      state.board = [];
      state.minesMap = [];
      state.flags = 0;
    },
    customGame: (state, action) => {
      state.difficulty = action.payload.difficulty;
      state.width = action.payload.width;
      state.height = action.payload.height;
      state.mines = action.payload.mines;
      state.board = [];
      state.minesMap = [];
      state.flags = 0;
    },
    resetGame: (state) => {
      state.gameState = "ready";
    },
    gameOver: (state) => {
      state.gameState = "over";
    },
    clearGame: (state) => {
      state.gameState = "clear";
    },
    startGame: (state) => {
      state.gameState = "playing";
    },
    setMinesMap: (state, action) => {
      const { minesMap } = action.payload;
      state.minesMap = minesMap;
    },
    setBoard: (state) => {
      for (let i = 0; i < state.width; i++) {
        state.board[i] = [];
        for (let j = 0; j < state.height; j++) {
          state.board[i][j] = "";
        }
      }
      state.flags = 0;
    },
    setBoardCell: (state, action) => {
      const { xPos, yPos, value } = action.payload;
      state.board[xPos][yPos] = value;
    },
    addFlags: (state) => {
      state.flags = state.flags + 1;
    },
    removeFlags: (state) => {
      state.flags = state.flags - 1;
    },
  },
});

export const {
  setGame,
  customGame,
  setMinesMap,
  resetGame,
  startGame,
  gameOver,
  clearGame,
  setBoard,
  setBoardCell,
  addFlags,
  removeFlags,
} = gameSetting.actions;
export const gameSelector = (state: rootState) => state.gameSetting;
export default gameSetting;

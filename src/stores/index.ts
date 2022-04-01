import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import gameSetting from "./gameSetting";

const rootReducer = combineReducers({
  gameSetting: gameSetting.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type rootState = ReturnType<typeof rootReducer>;
export default store;

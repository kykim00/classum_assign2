import React from "react";
import { GameSetting } from "./components/GameSetting";
import { Provider } from "react-redux";
import store from "./stores";
import { GameStart } from "./components/GameStart";
function App() {
  return (
    <>
      <Provider store={store}>
        <GameSetting />
        <GameStart />
      </Provider>
    </>
  );
}

export default App;

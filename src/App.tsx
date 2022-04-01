import React from "react";
import { GameSetting } from "./components/GameSetting";
import { Provider } from "react-redux";
import store from "./stores";
function App() {
  return (
    <>
      <Provider store={store}>
        <GameSetting />
      </Provider>
    </>
  );
}

export default App;

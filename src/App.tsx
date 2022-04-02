import React from "react";
import { Provider } from "react-redux";
import store from "./stores";
import { Main } from "./pages/Main";
function App() {
  return (
    <div>
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
  );
}

export default App;

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";


import GlobalStyle from "./styles/GlobalStyle";
import Routes from "./routes";

function App() {
    return (
        <Provider store={store}>
            <GlobalStyle />
            <div className="App">{Routes()}</div>
        </Provider>
    );
}

export default App;

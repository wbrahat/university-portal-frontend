import ReactDOM from "react-dom/client";
import store from "../src/app/store.js";
import App from "./App.jsx";
import "./styles/index.css";
import { Provider } from "react-redux";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

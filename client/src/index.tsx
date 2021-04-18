import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { TodoProvider } from "./state";

ReactDOM.render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

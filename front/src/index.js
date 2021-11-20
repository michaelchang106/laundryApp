import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UserLoginContextProvider } from "./store/UserLoginContext";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <UserLoginContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserLoginContextProvider>,
  document.getElementById("root")
);

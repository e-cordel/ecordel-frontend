import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { AppProvider } from "./contexts";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <ScrollToTop />
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AppProvider } from "./contexts";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./components/ScrollToTop";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AppProvider>
      <ScrollToTop />
      <App />
    </AppProvider>
  </React.StrictMode>
);

reportWebVitals();

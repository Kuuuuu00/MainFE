import React from "react";

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import ReactQueryProvider from "@/utils/ReactQueryProvider";

import "@/styles/globals.css";
import "@/styles/fonts.css";
import App from "@/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactQueryProvider>
  </React.StrictMode>
);

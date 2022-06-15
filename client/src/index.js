import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { TelegramWebApp } from "react-telegram-webapp";
import { Main } from "./pages";
import { Routes, Route, BrowserRouter } from "react-router-dom";

async function validateHash() {
  return true;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TelegramWebApp validateHash={validateHash}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Main />} />
        </Routes>
      </BrowserRouter>
    </TelegramWebApp>
  </React.StrictMode>
);

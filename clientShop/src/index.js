import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { TelegramWebApp } from "react-telegram-webapp";
import { Main } from "./pages";

async function validateHash() {
  return true;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TelegramWebApp validateHash={validateHash}>
      <Main />
    </TelegramWebApp>
  </React.StrictMode>
);

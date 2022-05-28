import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { TelegramWebApp } from "react-telegram-webapp";
import App from "./app";

async function validateHash() {
  return true;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TelegramWebApp validateHash={validateHash}>
      <App />
    </TelegramWebApp>
  </React.StrictMode>
);

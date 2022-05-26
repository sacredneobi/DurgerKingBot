import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { TelegramWebApp } from "react-telegram-webapp";
import App from "./app";

async function validateHash(hash) {
  console.log(hash);
  // const response = await fetch(`/api/validate`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ hash }),
  // });

  return true;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TelegramWebApp validateHash={validateHash}>
      <div>HELLO HTTPS</div>
      <App />
    </TelegramWebApp>
  </React.StrictMode>
);

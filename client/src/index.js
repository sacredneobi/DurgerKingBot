import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { TelegramWebApp } from "react-telegram-webapp";
import { Main, adminPages } from "./pages";
import "./localization";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./dashboard";

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
          <Route
            path="admin/*"
            element={<Dashboard adminPages={adminPages} />}
          />
        </Routes>
      </BrowserRouter>
    </TelegramWebApp>
  </React.StrictMode>
);

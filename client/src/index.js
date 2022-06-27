import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./localization";
import { TelegramWebApp } from "react-telegram-webapp";
import { Main, adminPages } from "./pages";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./dashboard";

async function validateHash() {
  return true;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TelegramWebApp validateHash={validateHash}>
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path="admin/*" element={<Dashboard adminPages={adminPages} />} />
      </Routes>
    </BrowserRouter>
  </TelegramWebApp>
);

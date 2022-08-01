import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "use-http";
import "./index.css";
import "./localization";
import { TelegramWebApp } from "react-telegram-webapp";
import { Main, adminPages, Login } from "./pages";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./dashboard";
import {
  UserContext as Context,
  useUserContext as useContext,
} from "@context/";

async function validateHash() {
  return true;
}

const Default = () => {
  const dataUser = useContext();

  const options = {
    cachePolicy: "no-cache",
    interceptors: {
      request: async ({ options }) => {
        options.headers = {
          "Content-Type": "application/json",
          Authorization: "JWT " + localStorage.getItem("token"),
        };
        return options;
      },
      response: (props) => {
        if (props.response.status === 401) {
          dataUser.data.setIsUser(false);
        }
        return props.response;
      },
    },
  };

  return (
    <TelegramWebApp validateHash={validateHash}>
      <Provider options={options}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Main />} />
            <Route
              path="admin/*"
              element={<Dashboard adminPages={adminPages} login={Login} />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </TelegramWebApp>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context>
    <Default />
  </Context>
);

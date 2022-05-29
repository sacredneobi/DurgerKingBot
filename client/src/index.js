import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Dashboard from "./dashboard";
import "./localization";
import { useAccessGet } from "./api";
import pages from "./pages";
import { correctRouter } from "./utils";

const App = () => {
  const [route, setRoute] = useState([]);
  const [routeSetting, setRouteSetting] = useState([]);
  const { execute, data, loading, error } = useAccessGet();

  useEffect(() => {
    execute();
  }, []);

  useEffect(() => {
    if (data) {
      setRoute(data.route ? correctRouter(data.route, pages) : []);
      setRouteSetting(
        data.routeSetting ? correctRouter(data.routeSetting, pages) : []
      );
    }
  }, [data]);

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    justifyContent: "center",
  };

  if (loading) return <div style={style}>LOADING...</div>;
  if (error) return <div style={style}>ERROR!</div>;

  return <Dashboard route={route} routeSetting={routeSetting} />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

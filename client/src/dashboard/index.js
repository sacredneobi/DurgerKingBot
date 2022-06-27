import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAccessGet } from "@api";
import { correctRouter } from "@utils";

import {
  Drawer,
  IconButton,
  Text,
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
  Navigation,
  ContentRouter,
} from "@components";
import style from "./style";

export default function MiniDrawer(props) {
  const { adminPages = [] } = props;

  const [route, setRoute] = useState([]);
  const [routeSetting, setRouteSetting] = useState([]);
  const { execute, data, loading, error } = useAccessGet();

  useEffect(() => {
    if (data) {
      setRoute(data.route ? correctRouter(data.route, adminPages) : []);
      setRouteSetting(
        data.routeSetting ? correctRouter(data.routeSetting, adminPages) : []
      );
    }
  }, [data]);

  useEffect(() => {
    execute();
  }, []);

  const matches = useMediaQuery("(min-width:500px)");
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  if (loading) return <div style={style}>LOADING...</div>;
  if (error) return <div style={style}>ERROR!</div>;

  return (
    <Box sx={style.root}>
      <CssBaseline />
      {matches ? (
        <AppBar position="fixed" sx={style.appBar}>
          <Toolbar>
            <IconButton
              onClick={handleDrawerOpen}
              textIcon="home"
              name={t("dashboard.menu")}
            />
            <Text variant="h6" caption={t("dashboard.menu")} />
          </Toolbar>
        </AppBar>
      ) : null}
      {matches ? (
        <Drawer open={open}>
          <Toolbar />
          <Navigation items={route} />
          <Navigation items={routeSetting} fixedBottom />
        </Drawer>
      ) : null}
      <Box component="main" sx={style.boxMain(matches)}>
        <ContentRouter routers={[...route, ...routeSetting]} />
      </Box>
    </Box>
  );
}

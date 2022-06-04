import * as React from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

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
} from "../components";
import style from "./style";

export default function MiniDrawer(props) {
  const { route, routeSetting } = props;

  const matches = useMediaQuery("(min-width:500px)");
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

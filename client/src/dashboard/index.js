import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAccessGet } from "@api";
import { correctRouter } from "@utils";
import { useUserContext as useContext } from "@context";
import { observer } from "mobx-react-lite";
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

export default observer((props) => {
  const { adminPages = [], login } = props;

  const dataUser = useContext();

  const [open, setOpen] = useState(true);
  const [access, setAccess] = useState({ route: [], routeSetting: [] });
  const [callbackGet, loading] = useAccessGet({ correctRouter, adminPages });

  useEffect(() => {
    if (dataUser.data.isUser) {
      callbackGet(setAccess);
    }
  }, [callbackGet, dataUser.data.isUser]);

  const { t } = useTranslation();

  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleOnLogout = (event) => {
    localStorage.removeItem("token");
    dataUser.data.setIsUser(false);
    event.stopPropagation();
  };

  if (loading) return <div style={style}>LOADING...</div>;

  if (!dataUser.data.isUser) {
    const Login = login;
    return <Login />;
  }

  return (
    <Box sx={style.root}>
      <CssBaseline />
      <AppBar position="fixed" sx={style.appBar}>
        <Toolbar>
          <IconButton
            onClick={handleDrawerOpen}
            textIcon="home"
            name={t("dashboard.menu")}
          />
          <Text variant="h6" caption={t("dashboard.menu")} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                fontSize: 24,
                backgroundColor: "primary.light",
                px: 0.5,
                borderRadius: 2,
                color: "primary.contrastText",
              }}
            >
              <a
                href="https://sacredapp.us/root"
                style={{ textDecoration: "none" }}
              >
                Перейти к полной версии
              </a>
            </Box>
          </Box>
          <IconButton textIcon="logout" onClick={handleOnLogout} />
        </Toolbar>
      </AppBar>
      <Drawer open={open}>
        <Toolbar />
        <Navigation items={access?.route ?? []} />
        <Navigation items={access?.routeSetting ?? []} fixedBottom />
      </Drawer>
      <Box component="main" sx={style.boxMain(true)}>
        <ContentRouter
          routers={[...(access?.route ?? []), ...(access?.routeSetting ?? [])]}
        />
      </Box>
    </Box>
  );
});

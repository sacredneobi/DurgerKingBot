import * as React from "react";
import { useTranslation } from "react-i18next";

import {
  Drawer,
  IconButton,
  Text,
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
  Routers,
} from "../components";
import style from "./style";

const defMenu = [
  { caption: "Andrey", icon: "directions_walk" },
  { caption: "GRAND", icon: "self_improvement" },
  { caption: "Виктор", icon: "emoji_people" },
  { caption: "Виктория", icon: "pool" },
];
const defSettings = [
  { caption: "settings", icon: "tune" },
  { caption: "translation", icon: "translate" },
];

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={style.root}>
      <CssBaseline />
      <AppBar position="fixed" sx={style.appBar}>
        <Toolbar>
          <IconButton
            onClick={handleDrawerOpen}
            textIcon="home"
            name={t(`dashboard.menu`)}
          />
          <Text variant="h6" caption={t(`dashboard.menu`)} />
        </Toolbar>
      </AppBar>
      <Drawer open={open}>
        <Toolbar />
        <Routers items={defMenu} />
        <Routers items={defSettings} fixedBottom />
      </Drawer>
      <Box component="main" sx={style.boxMain}>
        <Toolbar sx={{ mb: 1 }} />
        <Text
          paragraph
          noWrap={false}
          caption={"Lorem ipsum dolor sit " + "."}
        />
        <Text
          paragraph
          noWrap={false}
          caption={
            "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam" +
            "dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus" +
            "sed viverra tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod" +
            "lacinia at quis risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in." +
            "In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant" +
            "morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod" +
            "elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere" +
            "sollicitudin aliquam ultrices sagittis orci a."
          }
        />
      </Box>
    </Box>
  );
}

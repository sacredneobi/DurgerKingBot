import * as React from "react";
import { useTranslation } from "react-i18next";

import { Drawer, IconButton, ListItem, Text, Divider, Box, AppBar, Toolbar, List, CssBaseline } from "../components";
import style from "./style";

const defMenu = [["dashboard.Andrey", "dashboard.GRAND", "dashboard.Виктор", "dashboard.Виктория"]];

const ListItems = (props) => {
  const { item } = props;

  const { t } = useTranslation();

  if (!Array.isArray(item)) {
    return null;
  }
  return (
    <>
      <Divider />
      <List>
        {item.map((text, index) => {
          const data = { text: t(text), open, textIcon: index % 2 === 0 ? "inbox" : "looks" };
          return <ListItem key={text} {...data} />;
        })}
      </List>
    </>
  );
};

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
          <IconButton onClick={handleDrawerOpen} textIcon="home" name={t(`dashboard.menu`)} />
          <Text variant="h6" caption={t(`dashboard.menu`)} />
        </Toolbar>
      </AppBar>
      <Drawer open={open}>
        <Toolbar />
        {defMenu.map((item, index) => (
          <ListItems key={index} item={item} />
        ))}
      </Drawer>
      <Box component="main" sx={style.boxMain}>
        <Toolbar sx={{ mb: 1 }} />
        <Text paragraph noWrap={false} caption={"Lorem ipsum dolor sit " + "."} />
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

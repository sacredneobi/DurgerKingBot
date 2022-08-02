import { useTranslation } from "react-i18next";
import MainListItem from "../listItem";
import Divider from "../divider";
import List from "../list";
import IconButton from "../iconButton";

const RootItem = (props) => {
  const { onClick, rootOpen, ...other } = props;

  return (
    <MainListItem {...other} sx={{ display: "flex" }}>
      <IconButton
        textIcon={rootOpen ? "expand_less" : "expand_more"}
        onClick={onClick}
      />
    </MainListItem>
  );
};

const ListItem = (props) => {
  const { caption, icon = "warning", name, route, level = 0 } = props;

  const { t } = useTranslation();

  const data = {
    text: t(`routes.${caption}`),
    open: true,
    textIcon: icon,
    to: name,
  };

  if (route) {
    return (
      <List
        level={level + 2}
        collapse
        to={name}
        rootItem={(props) => <RootItem {...props} {...data} />}
      >
        {route.map((item, index) => {
          const { name: localName, ...other } = item;
          return (
            <ListItem
              key={index}
              {...other}
              name={`${name}/${localName}`}
              level={level + 1}
            />
          );
        })}
      </List>
    );
  }

  return <MainListItem {...data} />;
};

const Default = (props) => {
  const { items, fixedBottom } = props;

  if (!Array.isArray(items)) {
    return null;
  }

  const style = fixedBottom
    ? {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "flex-end",
      }
    : null;

  return (
    <div style={style}>
      <Divider />
      <List>
        {items.map((item, index) => (
          <ListItem key={index} {...item} />
        ))}
      </List>
    </div>
  );
};

export default Default;

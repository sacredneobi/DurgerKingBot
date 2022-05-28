import { useTranslation } from "react-i18next";
import ListItem from "../listItem";
import Divider from "../divider";
import List from "../list";

const Default = (props) => {
  const { items, fixedBottom } = props;

  const { t } = useTranslation();

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
        {items.map((item) => {
          const data = {
            text: t(`routes.${item.caption}`),
            open,
            textIcon: item.icon,
          };
          return <ListItem key={item.caption} {...data} />;
        })}
      </List>
    </div>
  );
};

export default Default;

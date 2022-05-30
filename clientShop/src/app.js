import { useEffect, useCallback } from "react";
import {
  useTelegramWebApp,
  useIsTelegramWebAppReady,
} from "react-telegram-webapp";
import { Box } from "@mui/material";
import { GridItem } from "./components";
import {
  burger,
  cake,
  coke,
  cookie,
  donut,
  flan,
  fries,
  hotdog,
  pizza,
} from "./res/icons";

const items = [
  { id: 1, caption: "Boby Boba", icon: burger },
  { id: 2, caption: "Andrey", icon: cake },
  { id: 3, caption: "GRAND", icon: coke },
  { id: 4, caption: "Джабраил", icon: cookie },
  { id: 5, caption: "Антон", icon: donut },
  { id: 6, caption: "Виктория", icon: flan },
  { id: 6, caption: "Виктор", icon: fries },
  { id: 6, caption: "3", icon: hotdog },
  { id: 6, caption: "3", icon: pizza },
];

const Default = () => {
  const isReady = useIsTelegramWebAppReady();

  const tel = useTelegramWebApp();

  const handleOnClick = useCallback(() => {
    console.log("ddd");
  }, []);

  useEffect(() => {
    if (isReady) {
      tel.MainButton.setParams({
        color: "rgb(49, 181, 69)",
        text: "Привет Boby BOba",
        is_visible: true,
        is_active: true,
      })
        .showProgress(true)
        .onClick(() => {
          handleOnClick();
        });
    }
  }, [isReady]);

  if (isReady)
    return (
      <Box sx={{ margin: 1 }}>
        <GridItem items={items} />
      </Box>
    );

  return <div />;
};

export default Default;

import { useEffect, useCallback } from "react";
import {
  useTelegramWebApp,
  useIsTelegramWebAppReady,
} from "react-telegram-webapp";
import { Box } from "@mui/material";
import { Items } from "./components";

const items = [
  { id: 1, caption: "Boby Boba" },
  { id: 2, caption: "Andrey" },
  { id: 3, caption: "GRAND" },
  { id: 4, caption: "1" },
  { id: 5, caption: "2" },
  { id: 6, caption: "3" },
  { id: 6, caption: "3" },
  { id: 6, caption: "3" },
  { id: 6, caption: "3" },
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
        // .showProgress(true)
        .onClick(() => {
          handleOnClick();
        });
    }
  }, [isReady]);

  if (isReady)
    return (
      <Box sx={{ width: "100%" }}>
        <Items items={items} />
      </Box>
    );

  return <div />;
};

export default Default;

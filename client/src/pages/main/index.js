import { useEffect } from "react";
import {
  useTelegramWebApp,
  useIsTelegramWebAppReady,
} from "react-telegram-webapp";
import { Box, Loading } from "../../components";
import { useGoodGet } from "../../api";
import Grid from "./grid";
import Bottom from "./bottom";
import { root, grid, baseLine } from "./styles";
import Search from "./search";

const countPerPage = 20;

const Default = (props) => {
  const isReady = useIsTelegramWebAppReady();

  const { countPage, items, usePage, page, loading, useSearch } =
    useGoodGet(countPerPage);

  const tel = useTelegramWebApp();

  useEffect(() => {
    if (isReady) {
      // tel.expand(true);
      // tel.MainButton.setParams({
      //   color: "rgb(49, 181, 69)",
      //   text: "Привет Boby Boba",
      //   is_visible: true,
      //   is_active: true,
      // })
      //   .showProgress(true)
      //   .onClick(() => {
      //     handleOnClick();
      //   });
    }
  }, [isReady, tel]);

  if (isReady)
    return (
      <Box sx={root}>
        {loading ? (
          <Loading />
        ) : (
          <Grid items={loading ? [] : items} sx={grid} />
        )}
        <Box sx={{ ...baseLine }} />
        <Bottom
          search={(props) => (
            <Search {...props} sx={{ marginLeft: 1, marginRight: 1 }} />
          )}
          onSearch={useSearch}
          page={page}
          count={countPage}
          onSetPage={usePage}
        />
      </Box>
    );

  return <div />;
};

export default Default;

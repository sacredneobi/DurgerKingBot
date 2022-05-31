import { useState } from "react";

import { Grid, Box as MUIBox, Button, Avatar, Typography } from "@mui/material";
import Icon from "../icon";
import Badge from "../badge";
import { experimentalStyled as styled } from "@mui/material/styles";

const Box = styled(MUIBox)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(1),
}));

const containerItem = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
};

const Item = (props) => {
  const { caption, icon } = props;

  const [counter, setCounter] = useState(0);

  const handleOnClick = () => {
    setCounter((prev) => prev + 1);
  };

  const handleOnDel = () => {
    setCounter((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  return (
    <MUIBox sx={containerItem}>
      <Badge counter={counter}>
        <Avatar variant="square" src={icon} sx={{ height: 74, width: 74 }} />
      </Badge>
      <Typography
        variant="button"
        display="block"
        gutterBottom
        sx={{ margin: 1 }}
        noWrap
      >
        {caption}
      </Typography>
      <div
        style={{
          width: "100%",
          minHeight: 25,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          onClick={handleOnDel}
          sx={{
            flexBasis: counter === 0 ? "0%" : "45%",
            minWidth: 0,
            backgroundColor: "#e64d44",
            visibility: counter === 0 ? "hidden" : "visible",
            opacity: counter === 0 ? 0 : 1,
            transition: "all 0.2s ease-out",
            padding: "unset",
            borderRadius: 2,
            height: 50,
            maxHeight: 50,
          }}
        >
          {counter === 0 ? "" : <Icon textIcon="remove" />}
        </Button>
        <Button
          variant="contained"
          onClick={handleOnClick}
          sx={{
            flexBasis: counter === 0 ? "100%" : "45%",
            minWidth: 0,
            backgroundColor: "#f8a917",
            transition: "all 0.2s ease-out",
            fontWeight: "700",
            fontSize: 14,
            borderRadius: 2,
            height: 50,
            maxHeight: 50,
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
          }}
        >
          {counter === 0 ? (
            <Icon textIcon="local_mall" sx={{ fontSize: 35 }} />
          ) : (
            <Icon textIcon="add" />
          )}
        </Button>
      </div>
    </MUIBox>
  );
};

const Default = (props) => {
  const { items = [] } = props;

  return (
    <Grid
      container
      columns={{ xs: 3, sm: 4, md: 6, lg: 8, xl: 12 }}
      justifyContent="flex-start"
    >
      {items.map((item, index) => {
        return (
          <Grid key={index} item xs={1}>
            <Box>
              <Item {...item} />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Default;

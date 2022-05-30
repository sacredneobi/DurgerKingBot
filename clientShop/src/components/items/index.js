import { useState } from "react";

import {
  Grid,
  Box as MUIBox,
  Button,
  Badge,
  ButtonGroup,
  Avatar,
  Typography,
} from "@mui/material";
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
      <Badge badgeContent={counter} color="primary">
        <Avatar variant="square" src={icon} sx={{ height: 74, width: 74 }} />
      </Badge>
      <Typography
        variant="button"
        display="block"
        gutterBottom
        sx={{ margin: 1 }}
      >
        {caption}
      </Typography>
      {counter === 0 ? (
        <Button
          variant="contained"
          onClick={handleOnClick}
          sx={{ width: "100%", backgroundColor: "rgb(49, 181, 69)" }}
        >
          ADD
        </Button>
      ) : (
        <ButtonGroup
          disableElevation
          variant="contained"
          color="warning"
          sx={{ width: "100%" }}
        >
          <Button onClick={handleOnDel} sx={{ width: "100%" }}>
            -
          </Button>
          <Button onClick={handleOnClick} sx={{ width: "100%" }}>
            +
          </Button>
        </ButtonGroup>
      )}
    </MUIBox>
  );
};

const Default = (props) => {
  const { items = [] } = props;

  return (
    <Grid container columns={{ xs: 4 }} justifyContent="flex-start">
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

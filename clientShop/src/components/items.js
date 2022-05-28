import { useState } from "react";

import { Grid, Box as MUIBox, Button, Badge, ButtonGroup } from "@mui/material";
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
  minHeight: 100,
  width: 100,
};

const Item = (props) => {
  const { id, caption } = props;

  const [counter, setCounter] = useState(0);

  const handleOnClick = () => {
    setCounter((prev) => prev + 1);
  };

  const handleOnDel = () => {
    setCounter((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  return (
    <Badge badgeContent={counter} color="primary">
      <MUIBox sx={containerItem}>
        {id} {caption}
        {counter === 0 ? (
          <Button
            variant="contained"
            onClick={handleOnClick}
            sx={{ width: "100%", backgroundColor: "rgb(49, 181, 69)" }}
          >
            ADD
          </Button>
        ) : (
          <ButtonGroup disableElevation variant="contained" color="warning">
            <Button onClick={handleOnDel}>-</Button>
            <Button onClick={handleOnClick}>+</Button>
          </ButtonGroup>
        )}
      </MUIBox>
    </Badge>
  );
};

const Items = (props) => {
  const { items = [] } = props;

  return (
    <Grid container columns={{ xs: 4 }}>
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

export default Items;

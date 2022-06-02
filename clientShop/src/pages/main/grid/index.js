import { Grid } from "@mui/material";
import { Box } from "../../../components";
import Item from "./item";

const Default = (props) => {
  const { items = [], sx, ...other } = props;

  return (
    <Box sx={{ ...sx, padding: 2 }}>
      <Grid
        container
        columns={{ xs: 3, sm: 4, md: 6, lg: 8, xl: 12 }}
        justifyContent="flex-start"
        spacing={2}
        {...other}
      >
        {items.map((item, index) => {
          return (
            <Grid key={index} item xs={1}>
              <Item {...item} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Default;

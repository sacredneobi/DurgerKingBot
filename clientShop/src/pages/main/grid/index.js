import { Grid } from "@mui/material";
import { Box } from "../../../components";
import Item from "./item";
import { rootBox } from "./styles";

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
            <Box sx={rootBox}>
              <Item {...item} />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Default;

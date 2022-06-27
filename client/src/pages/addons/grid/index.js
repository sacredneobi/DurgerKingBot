import { Box, Grid } from "@components";

const Default = (props) => {
  const { renderItem, items = [], sx, ...other } = props;

  const Item = renderItem ? renderItem : (props) => <div {...props} />;

  return (
    <Box sx={{ ...sx, padding: 2 }}>
      <Grid
        container
        columns={{ xs: 3, sm: 4, md: 4, lg: 4, xl: 4 }}
        justifyContent="flex-start"
        spacing={2}
        {...other}
      >
        {items.map((item) => {
          return (
            <Grid key={item.id} item xs={1}>
              <Item {...item} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Default;

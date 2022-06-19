import { Box, Avatar, Badge } from "../../components";
import { bottle } from "../../res/icons";
import { Skeleton, Divider, Typography } from "@mui/material";
import { useGoodGetById } from "../../api";

const Loading = (props) => {
  return (
    <Skeleton variant="rectangular" animation="wave" width="100%" height={80} />
  );
};

const Default = (props) => {
  const { count, isLast, id } = props;

  const { item, loading } = useGoodGetById(id);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "space-between",
          gap: 1.5,
          paddingLeft: 1,
          paddingRight: 1,
          minHeight: 80,
        }}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // flexWrap: "wrap",
              }}
            >
              <Badge counter={count}>
                <Avatar src={bottle} sizeImage={80} />
              </Badge>
            </div>
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <Box>
                <Typography variant="subtitle2" gutterBottom component="div">
                  {item.caption}&nbsp;
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" display="block" gutterBottom>
                  {item.description ? item.description : " 50ml"}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {item.description ? item.description : " parfume"}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {item.description ? item.description : " TESTER"}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography noWrap sx={{ fontWeight: "bold" }}>
                {item.price}
              </Typography>
            </Box>
          </>
        )}
      </Box>
      {!isLast && <Divider flexItem />}
    </>
  );
};

export default Default;

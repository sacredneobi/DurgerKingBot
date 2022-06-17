import { Box, Avatar } from "../../components";
import { bottle } from "../../res/icons";
import Divider from "@mui/material/Divider";

const Default = (props) => {
  const { caption, count, price, isLast } = props;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1.5,
          paddingLeft: 1,
          paddingRight: 1,
        }}
      >
        <Avatar src={bottle} sizeImage={80} />
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Box>
            {caption} {count}x
          </Box>
          <Box>description</Box>
        </Box>
        <Box>${price}</Box>
      </Box>
      {!isLast && <Divider flexItem />}
    </>
  );
};

export default Default;

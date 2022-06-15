import { Box, Text, Icon } from "../../components";
import { Skeleton } from "@mui/material";
import {
  rootContainerButton,
  rootContainer,
  rootTypography,
  containerButton,
} from "./styles";
import { useSearchParams } from "react-router-dom";
import Button from "../addons/grid/button";

const Default = (props) => {
  const { caption, loading, id } = props;
  let [, setSearchParams] = useSearchParams();
  // let location = useLocation();

  const handleOnClick = () => {
    setSearchParams({ articleId: id });
  };

  if (loading) {
    return <Skeleton variant="rectangular" width="100%" height="175px" />;
  }

  return (
    <Box sx={rootContainer} onClick={handleOnClick}>
      <Icon
        textIcon="sunny_snowing"
        sx={{ height: 80, width: 80, fontSize: 77, color: "#bda1a1" }}
      />
      <Box
        sx={{
          margin: 0,
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text {...rootTypography} caption={caption} />
      </Box>
      <Box sx={rootContainerButton}>
        <Button
          textIcon="exit_to_app"
          sx={containerButton(true, true)}
          onClick={handleOnClick}
        />
      </Box>
    </Box>
  );
};

export default Default;

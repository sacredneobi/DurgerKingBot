import { useState } from "react";
import { Badge, Box, Text, Avatar } from "../../components";
import { Skeleton } from "@mui/material";
import {
  rootContainerButton,
  rootContainer,
  rootTypography,
  containerButton,
} from "./styles";
import Button from "../addons/grid/button";

const Default = (props) => {
  const { caption, icon, loading } = props;

  const [counter, setCounter] = useState(0);

  const handleOnClick = (add) => () => {
    setCounter((prev) => (add ? prev + 1 : prev - 1 < 0 ? 0 : prev - 1));
  };

  const isZero = counter === 0;

  if (loading) {
    return <Skeleton variant="rectangular" width="100%" height="200px" />;
  }

  return (
    <Box sx={rootContainer}>
      <Badge counter={counter}>
        <Avatar src={icon} sizeImage={80} />
      </Badge>
      <Box
        sx={{
          marginTop: 1,
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text {...rootTypography} caption={caption} />
      </Box>
      <Box sx={rootContainerButton}>
        <Button
          textIcon="remove"
          onClick={handleOnClick(false)}
          sx={containerButton(isZero)}
        />
        <Button
          textIcon={isZero ? "local_mall" : "add"}
          onClick={handleOnClick(true)}
          sx={containerButton(isZero, true)}
        />
      </Box>
    </Box>
  );
};

export default Default;

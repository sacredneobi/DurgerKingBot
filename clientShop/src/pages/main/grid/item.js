import { useState } from "react";
import { Badge, Box, Text, Avatar } from "../../../components";
import {
  rootTypography,
  rootContainerButton,
  containerButton,
  rootContainer,
} from "./styles";
import { Skeleton } from "@mui/material";
import Button from "./button";

const Default = (props) => {
  const { caption, icon, loading } = props;

  const [counter, setCounter] = useState(0);

  const handleOnClick = (add) => () => {
    setCounter((prev) => (add ? prev + 1 : prev - 1 < 0 ? 0 : prev - 1));
  };

  const isZero = counter === 0;

  if (loading) {
    return <Skeleton variant="rectangular" width="100%" height="100%" />;
  }

  return (
    <Box sx={rootContainer}>
      <Badge counter={counter}>
        <Avatar src={icon} sizeImage={80} />
      </Badge>
      <Text {...rootTypography} caption={caption} />
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

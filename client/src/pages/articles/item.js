import { Box, Text, Icon, Skeleton } from "@components";
import {
  rootContainerButton,
  rootContainer,
  rootTypography,
  containerButton,
  rootIcon,
  textContainer,
} from "./styles";
import { useSearchParams } from "react-router-dom";
import Button from "../addons/grid/button";

const Default = (props) => {
  const { caption, loading, id, page } = props;
  const [, setSearchParams] = useSearchParams();

  const handleOnClick = () => {
    setSearchParams({ articleId: id, pageArticle: page });
  };

  if (loading) {
    return <Skeleton height="175px" />;
  }

  return (
    <Box sx={rootContainer} onClick={handleOnClick}>
      <Icon textIcon="sunny_snowing" sx={rootIcon} />
      <Box sx={textContainer}>
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

import { Box, Text, Icon, Skeleton, Button } from "@components";
import {
  rootContainerButton,
  rootContainer,
  rootTypography,
  containerButton,
  rootIcon,
  textContainer,
} from "./styles";
import { useSearchParams } from "react-router-dom";

const Default = (props) => {
  const { caption, loading, id, page } = props;
  const [, setSearchParams] = useSearchParams();

  const handleOnClick = (event) => {
    setSearchParams({ articleId: id, pageArticle: page });
    event.stopPropagation();
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
        <Button textIcon="exit_to_app" sx={containerButton(true, true)} />
      </Box>
    </Box>
  );
};

export default Default;

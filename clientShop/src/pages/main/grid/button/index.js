import { Button } from "@mui/material";
import Icon from "../icon";

const Default = (props) => {
  const { textIcon, ...other } = props;
  return (
    <Button variant="contained" {...other}>
      <Icon textIcon={textIcon} />
    </Button>
  );
};

export default Default;

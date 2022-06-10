import { Avatar } from "@mui/material";

const Default = (props) => {
  const { icon, sizeImage, ...other } = props;
  return (
    <Avatar
      src={icon}
      {...other}
      sx={{ height: sizeImage, width: sizeImage }}
    />
  );
};

export default Default;

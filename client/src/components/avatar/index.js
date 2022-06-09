import { Avatar, Fade } from "@mui/material";

const Default = (props) => {
  const { icon, sizeImage, ...other } = props;
  return (
    <Fade in={true} timeout={{ enter: 600 }}>
      <Avatar
        src={icon}
        {...other}
        sx={{ height: sizeImage, width: sizeImage }}
      />
    </Fade>
  );
};

export default Default;

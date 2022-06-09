import { Typography } from "@mui/material";

const Default = (props) => {
  const { caption, ...other } = props;

  return (
    <Typography component="div" text="" {...other}>
      {caption}
    </Typography>
  );
};

export default Default;

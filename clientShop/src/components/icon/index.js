import { Icon, Fade } from "@mui/material";

const Default = (props) => {
  const { textIcon, ...other } = props;

  return (
    <Fade in={true} timeout={{ enter: 600 }}>
      <Icon className="material-icons-round" {...other}>
        {textIcon}
      </Icon>
    </Fade>
  );
};

export default Default;

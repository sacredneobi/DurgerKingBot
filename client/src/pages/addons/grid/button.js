import { Icon, Button } from "@components";

const Default = (props) => {
  const { textIcon, ...other } = props;
  return (
    <Button variant="contained" {...other}>
      <Icon textIcon={textIcon} sx={{ fontSize: 35 }} />
    </Button>
  );
};

export default Default;

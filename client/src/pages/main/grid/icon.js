import { Icon } from "../../../components";
import { containerButtonIconDefault } from "./styles";

const Default = (props) => {
  const { textIcon } = props;

  return <Icon textIcon={textIcon} sx={containerButtonIconDefault} />;
};

export default Default;

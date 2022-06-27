import { Table, Text, Icon } from "@components";
import { useGoodGet } from "@api";

const Header = (props) => {
  const { caption, id } = props;
  return (
    <>
      <Text sx={{ width: "15%", flexShrink: 0 }} caption={id} />
      <Text sx={{ color: "text.secondary" }} caption={caption} />
      <Icon textIcon="edit" />
    </>
  );
};

const Details = (props) => {
  const { caption, id, description } = props;
  return (
    <>
      <Text sx={{ width: "15%", flexShrink: 0 }} caption={id} />
      <Text sx={{ color: "text.secondary" }} caption={description} />
      <Text sx={{ color: "text.secondary" }} caption={caption} />
    </>
  );
};

const Default = (props) => {
  const goodsData = useGoodGet(100, 14457);

  return (
    <Table
      {...goodsData}
      header={(props) => <Header {...props} />}
      details={(props) => <Details {...props} />}
    />
  );
};

export default { name: "goods", component: Default };

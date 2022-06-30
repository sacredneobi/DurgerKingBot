import { memo } from "react";
import { Table, Text, IconButton, Box } from "@components";
import { useGoodGet } from "@api";
import { areEqualAlways } from "@utils/areRender";

const Header = (props) => {
  const { caption, id } = props;

  const handleOnEdit = (event) => {
    console.log("edit");
    event.stopPropagation();
  };

  const handleOnDelete = (event) => {
    console.log("delete");
    event.stopPropagation();
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: 1,
        alignItems: "center",
        padding: (them) => them.spacing(0, 1, 0, 1),
      }}
    >
      <Text sx={{ flexShrink: 0 }} caption={id} />
      <Text sx={{ color: "text.secondary", flexGrow: 1 }} caption={caption} />
      <IconButton
        textIcon="edit"
        color="primary"
        edge={false}
        onClick={handleOnEdit}
      />
      <IconButton
        textIcon="delete"
        color="error"
        edge={false}
        onClick={handleOnDelete}
      />
    </Box>
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

const Goods = memo((props) => {
  const goodsData = useGoodGet(100, 14457, true);

  return (
    <Table
      {...goodsData}
      itemsRender={{
        header: (props) => <Header {...props} />,
        details: (props) => <Details {...props} />,
      }}
      showCheck
    />
  );
}, areEqualAlways);

const Default = (props) => {
  return <Goods />;
};

export default { name: "goods", component: Default };

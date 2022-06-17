import { Box } from "../../components";
import Item from "./item";
import Header from "./header";
import Bottom from "./bottom";

const items = [
  { caption: "Ivan", count: 11.2, price: 10.22 },
  { caption: "IndoorChampion", count: 11.2, price: 10.22 },
  { caption: "Mikhail Popov", count: 11.2, price: 10.22 },
  { caption: "Muzaffar Abidov", count: 11.2, price: 10.22 },
  { caption: "Anton S", count: 11.2, price: 10.22 },
];

const Default = (props) => {
  const { show, setShow } = props;

  const handleOnClick = () => {
    // setShow((prev) => !prev);
  };
  return (
    <Box
      sx={{
        opacity: show ? 1 : 0,
        display: show ? "block" : "none",
        visibility: show ? "visible" : "hidden",
        maxHeight: show ? "100vh" : 0,
        height: show ? "100vh" : 0,
        transition: "all 0.3s ease-out",
        flexDirection: "column",
        width: "100%",
        overflow: "auto",
        backgroundColor: "#ebedf0",
        color: "#000",
      }}
      onClick={handleOnClick}
    >
      <Header setShow={setShow} />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#fff",
          paddingBottom: 2,
        }}
      >
        {items.map((item, index, arr) => (
          <Item key={index} {...item} isLast={arr.length - 1 === index} />
        ))}
      </Box>
      <Bottom setShow={setShow} />
    </Box>
  );
};

export default Default;

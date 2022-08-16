import { memo } from "react";
import { areEqualAlways } from "@utils";
import { ClientsContext as Context } from "@context";
import { Box, Text } from "@components";

const items = [
  {
    month: {
      month: "Август",
      day: "1",
    },
    time: {
      night: "2:09",
      sun: "4:16",
      lunch: "12:05",
      sport: "16:14",
      dinner: "19:48",
      sleep: "21:55",
    },
  },
  {
    month: {
      month: "Август",
      day: "2",
    },
    time: {
      night: "2:09",
      sun: "4:16",
      lunch: "12:05",
      sport: "16:14",
      dinner: "19:48",
      sleep: "21:55",
    },
  },
];

const Item = (props) => {
  const { value, caption, active } = props;
  return (
    <Box
      sx={{
        padding: (theme) => theme.spacing(2, 1),
        border: `2px solid ${
          active ? "rgb(132, 236, 151)" : "rgb(67, 83, 114)"
        }`,
        backgroundColor: "rgb(27, 36, 51)",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: 80,
        height: 120,
      }}
    >
      <Text
        caption={caption}
        sx={{
          color: active ? "rgb(128, 247, 137)" : "rgb(202, 216, 242)",
          marginTop: 1,
          userSelect: "none",
        }}
      />
      <Text
        caption={value}
        sx={{
          color: active ? "rgb(128, 247, 137)" : "rgb(202, 216, 242)",
          fontSize: 22,
          userSelect: "none",
        }}
      />
    </Box>
  );
};

const Month = (props) => {
  const { time } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "row", gap: 3, paddingBottom: 2 }}
      >
        {Object.keys(time).map((item, index) => (
          <Item
            key={item}
            caption={item}
            value={time[item]}
            active={index === 3}
          />
        ))}
      </Box>
    </Box>
  );
};

const Clients = (props) => {
  return (
    <Box sx={{ backgroundColor: "rgb(42, 56, 82)", padding: 3 }}>
      <Month {...items[0]} />
    </Box>
  );
};

const Default = memo((props) => {
  return (
    <Context>
      <Clients />
    </Context>
  );
}, areEqualAlways);

export default { name: "Clients", component: Default };

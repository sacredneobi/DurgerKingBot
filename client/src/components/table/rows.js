import { useState, useCallback } from "react";
import Box from "../box";
import Row from "./row";

const Default = (props) => {
  const { items, select, ...other } = props;

  const [expanded, setExpanded] = useState(false);

  const handleChange = useCallback((expanded) => {
    setExpanded(expanded);
  }, []);

  const onlySelect = select.filter((item) => item.checked);

  return (
    <Box sx={{ overflow: "auto", flexGrow: 1 }}>
      {Array.isArray(items)
        ? items.map((item, index) => (
            <Row
              key={index}
              {...other}
              item={item}
              selected={!!onlySelect.find((good) => good.id === item.id)}
              onChange={handleChange}
              expanded={expanded === item.id}
            />
          ))
        : null}
    </Box>
  );
};

export default Default;

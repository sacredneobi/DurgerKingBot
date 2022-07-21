import { Routes, Route } from "react-router-dom";
import { isFuncDef } from "@utils/";
import Box from "../box";

const flat = (items, array, baseName) => {
  if (Array.isArray(items)) {
    items.forEach((item) => {
      const { route, name, ...other } = item;
      array.push({ ...other, name: baseName ? `${baseName}/${name}` : name });
      if (Array.isArray(route)) {
        flat(route, array, name);
      }
    });
  }
};

const Default = (props) => {
  const { routers } = props;

  if (routers.length === 0) {
    return null;
  }

  const items = [];

  flat(routers, items);

  console.log(items);

  return (
    <Routes>
      <Route path="/" element={<div>MAIN</div>} />
      {items.map((item, index) => {
        return (
          <Route
            key={index}
            path={item.name}
            element={isFuncDef(
              item.component,
              <Box>{`NOT FOUND COMPONENT PAGE FOR "${item.name}"`}</Box>
            )}
          />
        );
      })}
    </Routes>
  );
};

export default Default;

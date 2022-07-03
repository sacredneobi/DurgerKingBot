import { Routes, Route } from "react-router-dom";
import { isFuncDef } from "@utils/";
import Box from "../box";

const Default = (props) => {
  const { routers } = props;

  if (routers.length === 0) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<div>MAIN</div>} />
      {routers.map((item, index) => {
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

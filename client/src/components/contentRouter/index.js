import { Routes, Route, useParams, Navigate } from "react-router-dom";
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

const checkParams = (params) => {
  return Object.keys(params).some((item) => params[item] === `:${item}`);
};

const Render = (props) => {
  const { item, name } = props;

  let params = useParams();
  if (checkParams(params)) {
    return (
      <Navigate to={`/admin/${params["*"].split("/")[0]}`} replace={true} />
    );
  }

  if (item?.type) {
    return <item.type />;
  }
  if (item) {
    return item();
  }

  return <Box>{`NOT FOUND COMPONENT PAGE FOR "${name}"`}</Box>;
};

const Default = (props) => {
  const { routers } = props;

  if (routers.length === 0) {
    return null;
  }

  const items = [];

  flat(routers, items);

  return (
    <Routes>
      <Route path="/" element={<div>MAIN</div>} />
      {items.map((item, index) => {
        return (
          <Route
            key={index}
            path={item.name}
            element={<Render name={item.name} item={item.component} />}
          />
        );
      })}
    </Routes>
  );
};

export default Default;

import { Routes, Route, useParams, Navigate } from "react-router-dom";
import { Box } from "..";

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

const Main = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>ПРИМЕР ПРОЕКТА</div>
        <Box
          sx={{
            fontSize: 32,
            backgroundColor: "primary.main",
            p: 1,
            borderRadius: 2,
            color: "primary.contrastText",
          }}
        >
          <a
            href="https://sacredapp.us/root"
            style={{ textDecoration: "none" }}
          >
            Полная версия
          </a>
        </Box>
      </div>
    </div>
  );
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

  return <Main caption={`NOT FOUND COMPONENT PAGE FOR "${name}"`} />;
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
      <Route path="/" element={<Main />} />
      {items.map((item, index) => {
        return (
          <Route
            key={index}
            path={item.name}
            element={<Render name={item.name} item={item.component} />}
          />
        );
      })}
      <Route path="*" element={<Main caption="ROUTERS NOT FOUND" />} />
    </Routes>
  );
};

export default Default;

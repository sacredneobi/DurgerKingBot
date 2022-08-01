import { Routes, Route, useParams, Navigate } from "react-router-dom";

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
  const { caption = "WINDOWS NOT FOUND" } = props;
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
      {caption}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "row",
          flexWrap: "wrap",
          width: 302,
          gap: 4,
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            backgroundColor: "#8bbee2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            flexGrow: 2,
          }}
        ></div>
        <div
          style={{
            width: 100,
            height: 100,
            backgroundColor: "#8bbee2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            borderRadius: 4,
          }}
        ></div>
        <div
          style={{
            width: 100,
            height: 100,
            backgroundColor: "#8bbee2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            borderRadius: 4,
          }}
        ></div>
        <div
          style={{
            width: 100,
            height: 100,
            backgroundColor: "#8bbee2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            borderRadius: 4,
          }}
        ></div>
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

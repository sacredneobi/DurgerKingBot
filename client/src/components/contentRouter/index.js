import { Routes, Route } from "react-router-dom";

const Default = (props) => {
  const { routers } = props;

  if (routers.length === 0) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<div>MAIN</div>} />
      {routers.map((item, index) => (
        <Route
          key={item.name ? item.name : index}
          path={item.name}
          element={
            typeof item.component === "function" ? (
              item.component()
            ) : (
              <div>ERROR COMPONENT</div>
            )
          }
        />
      ))}
    </Routes>
  );
};

export default Default;

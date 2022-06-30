import { Routes, Route } from "react-router-dom";

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
            element={
              typeof item.component === "function" ? (
                item.component()
              ) : (
                <div>{`NOT FOUND COMPONENT PAGE FOR "${item.name}"`}</div>
              )
            }
          />
        );
      })}
    </Routes>
  );
};

export default Default;

import { Routes, Route } from "react-router-dom";

const Default = (props) => {
  const { routers } = props;

  if (routers.length === 0) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<div>MAIN</div>} />
      {routers.map((item) => {
        console.log();
        return (
          <Route key={item.name} path={item.name} element={<div>1</div>} />
        );
      })}
    </Routes>
  );
};

export default Default;

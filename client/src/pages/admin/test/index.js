import { useParams } from "react-router-dom";

const Default = (props) => {
  let params = useParams();
  return <h1>Invoice {params.id}</h1>;
};

export default { name: "order/:id", component: Default };

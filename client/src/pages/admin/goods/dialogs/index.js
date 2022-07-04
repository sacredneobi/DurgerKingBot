import Delete from "./delete";
import Edit from "./edit";
import Create from "./create";

const Default = (props) => {
  return (
    <>
      <Delete {...props} />
      <Edit {...props} />
      <Create {...props} />
    </>
  );
};

export default Default;

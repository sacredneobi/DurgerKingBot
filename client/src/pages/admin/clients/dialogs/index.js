import Delete from "./delete";
import Edit from "./edit";

const Default = (props) => {
  return (
    <>
      <Delete {...props} />
      <Edit {...props} />
    </>
  );
};

export default Default;

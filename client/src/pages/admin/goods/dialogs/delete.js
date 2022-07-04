import { DialogDelete } from "@components";

const Default = (props) => {
  const handleOnDelete = (ids) => {
    console.log(ids);
  };

  return (
    <DialogDelete
      {...props}
      onDelete={handleOnDelete}
      propsContext="isShowDelete"
      text="СОЗДАНИЕ  YouTube"
    />
  );
};

export default Default;

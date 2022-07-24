import { DialogDelete } from "@components";
import { isFunc } from "@utils";
import { useGoodDelete } from "@api";

const Default = (props) => {
  const { reload, ...other } = props;

  const [callbackDelete] = useGoodDelete({ reload });

  const handleOnDelete = function ({ select, onClear } = {}) {
    callbackDelete({ id: select });
    isFunc(onClear);
  };

  return (
    <DialogDelete
      {...other}
      caption="Удалить выбранные элементы"
      onDelete={handleOnDelete}
      propsContext="isShowDelete"
      text="СОЗДАНИЕ  YouTube"
    />
  );
};

export default Default;

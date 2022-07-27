import { DialogDelete } from "@components";
import { isFunc } from "@utils";
import { useGoodCompositionDelete as useDelete } from "@api";

const Default = (props) => {
  const { reload, ...other } = props;

  const [callbackDelete] = useDelete({ reload });

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

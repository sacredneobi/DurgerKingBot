import { DialogDelete } from "@components";
import { observer } from "mobx-react-lite";

const Default = observer((props) => {
  const { useContext } = props;
  const { dialog = {} } = useContext ? useContext() : {};

  if (dialog.isShowEdit) {
    const handleOnClose = () => {
      dialog.setIsShowEdit(false);
      console.log("CLOSE");
    };

    const handleOnDelete = (item) => {
      handleOnClose();
      console.log("EDIT");
    };

    return (
      <DialogDelete
        onClose={handleOnClose}
        onDelete={handleOnDelete}
        text="РЕДАКТИРОВАНИЕ YouTube"
      />
    );
  }
  return null;
});

export default Default;

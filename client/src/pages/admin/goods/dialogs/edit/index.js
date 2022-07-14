import { observer } from "mobx-react-lite";
import Dialog from "./container";

const Default = observer((props) => {
  const { useContext } = props;
  const { dialog = {} } = useContext ? useContext() : {};

  if (dialog.isShowEdit) {
    const handleOnClose = () => {
      dialog.setIsShowEdit(false);
    };

    const handleOnSave = (data) => {
      handleOnClose();
      console.log("SAVE", data);
    };

    return (
      <Dialog
        id={dialog?.data?.select}
        onClose={handleOnClose}
        onSave={handleOnSave}
        text="РЕДАКТИРОВАНИЕ YouTube"
      />
    );
  }
  return null;
});

export default Default;

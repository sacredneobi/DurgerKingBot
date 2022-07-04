import { DialogDelete } from "@components";
import { observer } from "mobx-react-lite";

const Default = observer((props) => {
  const { useContext } = props;
  const { dialog = {} } = useContext ? useContext() : {};

  if (dialog.isShowCreate) {
    const handleOnClose = () => {
      dialog.setIsShowCreate(false);
      console.log("CLOSE");
    };

    const handleOnDelete = (item) => {
      handleOnClose();
      console.log("CREATE");
    };

    return (
      <DialogDelete
        onClose={handleOnClose}
        onDelete={handleOnDelete}
        text="СОЗДАНИЕ  YouTube"
      />
    );
  }
});

export default Default;

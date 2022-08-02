import { observer } from "mobx-react-lite";
import Dialog from "./dialog";
import { isFunc } from "@utils";
import { useGoodPost as usePost, useGoodUpdate as useUpdate } from "@api";

const Default = observer((props) => {
  const { useContext, reload } = props;
  const { dialog = {} } = useContext ? useContext() : {};

  const [callbackPost] = usePost();
  const [callbackUpdate] = useUpdate();

  if (dialog.isShowEdit) {
    const handleOnClose = () => {
      dialog.setIsShowEdit(false);
    };

    const handleOnSave = (data) => {
      data?.id ? callbackUpdate(data) : callbackPost(data);
      handleOnClose();
      isFunc(reload);
    };

    return (
      <Dialog
        id={dialog?.data?.select}
        onClose={handleOnClose}
        onSave={handleOnSave}
      />
    );
  }
  return null;
});

export default Default;

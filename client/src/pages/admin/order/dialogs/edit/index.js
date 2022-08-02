import { observer } from "mobx-react-lite";
import Dialog from "./dialog";
import { isFunc } from "@utils";
import {
  useGoodCompositionPost as usePost,
  useGoodCompositionUpdate as useUpdate,
} from "@api";

const Default = observer((props) => {
  const { useContext, reload, id } = props;
  const { dialog = {} } = useContext ? useContext() : {};

  const [callbackPost] = usePost();
  const [callbackUpdate] = useUpdate();

  if (dialog.isShowEdit) {
    const handleOnClose = () => {
      dialog.setIsShowEdit(false);
    };

    const handleOnSave = (data) => {
      data?.id
        ? callbackUpdate({ ...data, orderId: id })
        : callbackPost({ ...data, orderId: id });
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

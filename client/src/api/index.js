import { post as sendMessagePost } from "./sendMessage";
import {
  useGet as useGoodGet,
  useGetById as useGoodGetById,
  useGetById2 as useGoodGetById2,
  useDelete as useGoodDelete,
  usePost as useGoodPost,
  useUpdate as useGoodUpdate,
} from "./goods";
import {
  useGet as useArticleGet,
  useGetAll as useArticleGetAll,
} from "./articles";
import useAccessGet from "./access";

export {
  sendMessagePost,
  useGoodGet,
  useArticleGet,
  useGoodGetById,
  useAccessGet,
  useGoodDelete,
  useArticleGetAll,
  useGoodGetById2,
  useGoodPost,
  useGoodUpdate,
};

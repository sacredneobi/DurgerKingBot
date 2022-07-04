import { post as sendMessagePost } from "./sendMessage";
import {
  useGet as useGoodGet,
  useGetById as useGoodGetById,
  useDelete as useGoodDelete,
} from "./goods";
import { useGet as useArticleGet } from "./articles";
import useAccessGet from "./access";

export {
  sendMessagePost,
  useGoodGet,
  useArticleGet,
  useGoodGetById,
  useAccessGet,
  useGoodDelete,
};

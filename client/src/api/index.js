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
  useGetById as useArticleGetById,
  useDelete as useArticleDelete,
  usePost as useArticlePost,
  useUpdate as useArticleUpdate,
} from "./articles";
import {
  useGet as useClientsGet,
  useGetAll as useClientsGetAll,
  useGetById as useClientsGetById,
  useDelete as useClientsDelete,
  usePost as useClientsPost,
  useUpdate as useClientsUpdate,
} from "./clients";
import {
  useGet as useOrdersGet,
  useGetAll as useOrdersGetAll,
  useGetById as useOrdersGetById,
  useDelete as useOrdersDelete,
  usePost as useOrdersPost,
  useUpdate as useOrdersUpdate,
} from "./orders";
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
  useArticleGetById,
  useArticleDelete,
  useArticlePost,
  useArticleUpdate,
  useClientsGet,
  useClientsGetAll,
  useClientsGetById,
  useClientsDelete,
  useClientsPost,
  useClientsUpdate,
  useOrdersGet,
  useOrdersGetAll,
  useOrdersGetById,
  useOrdersDelete,
  useOrdersPost,
  useOrdersUpdate,
};

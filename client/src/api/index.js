import useAccessGet from "./access";
import { useAuth } from "./auth";
import { post as sendMessagePost } from "./sendMessage";
import {
  useGet as useGoodGet,
  useGetById as useGoodGetById,
  useGetById2 as useGoodGetById2,
  useDelete as useGoodDelete,
  usePost as useGoodPost,
  useUpdate as useGoodUpdate,
  useGetAll as useGoodGetAll,
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
import {
  useGet as useUsersGet,
  useGetById as useUsersGetById,
  useDelete as useUsersDelete,
  usePost as useUsersPost,
  useUpdate as useUsersUpdate,
} from "./users";
import {
  useGetById as useOrderGetById,
  useUpdate as useOrderUpdate,
  useDelete as useOrderDelete,
} from "./order";
import {
  useGetById as useClientGetById,
  useUpdate as useClientUpdate,
  useDelete as useClientDelete,
} from "./client";
import {
  useGetById as useGoodCompositionGetById,
  useUpdate as useGoodCompositionUpdate,
  useDelete as useGoodCompositionDelete,
  usePost as useGoodCompositionPost,
} from "./goodComposition";

export {
  sendMessagePost,
  useAuth,
  useGoodGet,
  useArticleGet,
  useGoodGetById,
  useAccessGet,
  useGoodDelete,
  useArticleGetAll,
  useGoodGetById2,
  useGoodPost,
  useGoodUpdate,
  useGoodGetAll,
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
  useOrderGetById,
  useOrderUpdate,
  useOrderDelete,
  useGoodCompositionGetById,
  useGoodCompositionUpdate,
  useGoodCompositionDelete,
  useGoodCompositionPost,
  useClientGetById,
  useClientUpdate,
  useClientDelete,
  useUsersGet,
  useUsersGetById,
  useUsersDelete,
  useUsersPost,
  useUsersUpdate,
};

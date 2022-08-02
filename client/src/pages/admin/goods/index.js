import { memo, useState } from "react";
import { Table } from "@components";
import { useGoodGet as useGet } from "@api";
import { areEqualAlways } from "@utils";
import {
  GoodsContext as Context,
  useGoodsContext as useContext,
  useContextSelect,
} from "@context";
import Header from "./header";
import Details from "./details";
import TopContainer from "./topContainer";
import Dialogs from "./dialogs";

const Goods = (props) => {
  const [articleId, setArticleId] = useState(null);
  const { reload, useSearch, ...other } = useGet(50, articleId, true);

  return (
    <>
      <Table
        {...other}
        userContext={useContextSelect}
        topContainer={(props) => (
          <TopContainer
            {...props}
            setArticleId={setArticleId}
            onSearch={useSearch}
          />
        )}
        itemsRender={{
          header: (props) => <Header {...props} />,
          details: (props) => <Details {...props} />,
        }}
        showCheck
      />
      <Dialogs useContext={useContext} reload={reload} />
    </>
  );
};

const Default = memo((props) => {
  return (
    <Context>
      <Goods />
    </Context>
  );
}, areEqualAlways);

export default { name: "goods", component: Default };

import { memo, useState } from "react";
import { Table } from "@components";
import { useGoodGet } from "@api";
import { areEqualAlways } from "@utils/areRender";
import { SelectGoods, GoodsContext, useGoodsContext } from "@context";
import Header from "./header";
import Details from "./details";
import TopContainer from "./topContainer";
import Dialogs from "./dialogs";

const Goods = (props) => {
  const [articleId, setArticleId] = useState(null);
  const { reload, useSearch, ...other } = useGoodGet(50, articleId, true);

  return (
    <>
      <Table
        {...other}
        userContext={SelectGoods}
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
      <Dialogs useContext={useGoodsContext} reload={reload} />
    </>
  );
};

const Default = memo((props) => {
  return (
    <SelectGoods.Provider value={[]} name="SELECT FOR TABLE GOODS">
      <GoodsContext>
        <Goods />
      </GoodsContext>
    </SelectGoods.Provider>
  );
}, areEqualAlways);

export default { name: "goods", component: Default };

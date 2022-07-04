import { memo } from "react";
import { Table } from "@components";
import { useGoodGet } from "@api";
import { areEqualAlways } from "@utils/areRender";
import { SelectGoods } from "@context";
import Header from "./header";
import Details from "./details";
import TopContainer from "./topContainer";
import { GoodsContext, useGoodsContext } from "@context/";
import Dialogs from "./dialogs";

const Goods = (props) => {
  const goodsData = useGoodGet(10, 14457, true);

  return (
    <>
      <Table
        {...goodsData}
        userContext={SelectGoods}
        topContainer={(props) => <TopContainer {...props} />}
        itemsRender={{
          header: (props) => <Header {...props} />,
          details: (props) => <Details {...props} />,
        }}
        showCheck
      />
      <Dialogs useContext={useGoodsContext} />
    </>
  );
};

const ContextGoods = memo((props) => {
  return (
    <SelectGoods.Provider value={[]} name="SELECT FOR TABLE GOODS">
      <GoodsContext>
        <Goods />
      </GoodsContext>
    </SelectGoods.Provider>
  );
}, areEqualAlways);

const Default = (props) => {
  return <ContextGoods />;
};

export default { name: "goods", component: Default };

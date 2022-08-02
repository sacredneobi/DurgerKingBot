import { memo, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Table } from "@components";
import { useOrderGetById as useGet } from "@api";
import { areEqualAlways } from "@utils";
import {
  OrderContext as Context,
  useOrderContext as useContext,
  useContextSelect,
} from "@context/";
import Header from "./header";
import Details from "./details";
import TopContainer from "./topContainer";
import Dialogs from "./dialogs";

const Main = (props) => {
  let { id } = useParams();

  const [order, setOrder] = useState({});
  const [reload, setReload] = useState(true);
  const [callbackGet, loading] = useGet();

  const handleReload = useCallback(() => {
    setReload((prev) => !prev);
  }, []);

  useEffect(() => {
    callbackGet(id, setOrder);
  }, [id, reload]);

  return (
    <>
      <Table
        loading={loading}
        items={order.compositionOrders}
        userContext={useContextSelect}
        topContainer={(props) => <TopContainer {...props} />}
        itemsRender={{
          header: (props) => <Header {...props} />,
          details: (props) => <Details {...props} />,
        }}
        showCheck
      />
      <Dialogs useContext={useContext} reload={handleReload} id={id} />
    </>
  );
};

const Default = memo((props) => {
  return (
    <Context>
      <Main />
    </Context>
  );
}, areEqualAlways);

export default { name: "order/:id", component: Default };

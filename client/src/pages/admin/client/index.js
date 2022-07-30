import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "@components";
import { useClientGetById as useGet } from "@api";
import { areEqualAlways } from "@utils/areRender";
import {
  OrderSelect as Select,
  OrderContext as Context,
  // useOrderContext as useContext,
} from "@context/";
import Header from "./header";
import Details from "./details";
import TopContainer from "./topContainer";
// import Dialogs from "./dialogs";

const Main = (props) => {
  let { id } = useParams();

  const [client, setClient] = useState({});
  const [callbackGet, loading] = useGet();

  useEffect(() => {
    callbackGet(id, setClient);
  }, [id]);

  return (
    <>
      <Table
        loading={loading}
        items={client?.orders ? client.orders : []}
        userContext={Select}
        topContainer={(props) => <TopContainer {...props} {...client} />}
        itemsRender={{
          header: (props) => <Header {...props} />,
          details: (props) => <Details {...props} />,
        }}
      />
    </>
  );
};

const Default = memo((props) => {
  return (
    <Select.Provider value={[]} name="SELECT FOR TABLE ORDER">
      <Context>
        <Main />
      </Context>
    </Select.Provider>
  );
}, areEqualAlways);

export default { name: "client/:id", component: Default };

import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "@components";
import { useClientGetById as useGet } from "@api";
import { areEqualAlways } from "@utils";
import { OrderContext as Context, useContextSelect } from "@context/";
import Header from "./header";
import Details from "./details";
import TopContainer from "./topContainer";

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
        userContext={useContextSelect}
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
    <Context>
      <Main />
    </Context>
  );
}, areEqualAlways);

export default { name: "client/:id", component: Default };

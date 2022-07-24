import { memo } from "react";
import { Table } from "@components";
import { useOrdersGet as useGet } from "@api";
import { areEqualAlways } from "@utils/areRender";
import { OrdersSelect, OrdersContext, useOrdersContext } from "@context";
import Header from "./header";
import Details from "./details";
import TopContainer from "./topContainer";
import Dialogs from "./dialogs";
import { Outlet } from "react-router-dom";

const Orders = (props) => {
  const { reload, useSearch, ...other } = useGet(50, 1);

  return (
    <>
      <Table
        {...other}
        userContext={OrdersSelect}
        topContainer={(props) => (
          <TopContainer {...props} onSearch={useSearch} />
        )}
        itemsRender={{
          header: (props) => <Header {...props} />,
          details: (props) => <Details {...props} />,
        }}
        showCheck
      />
      <Dialogs useContext={useOrdersContext} reload={reload} />
      <Outlet />
    </>
  );
};

const Default = memo((props) => {
  return (
    <OrdersSelect.Provider value={[]} name="SELECT FOR TABLE Orders">
      <OrdersContext>
        <Orders />
      </OrdersContext>
    </OrdersSelect.Provider>
  );
}, areEqualAlways);

export default { name: "Orders", component: Default };

import { memo } from "react";
import { Table } from "@components";
import { useClientsGet as useGet } from "@api";
import { areEqualAlways } from "@utils/areRender";
import { ClientsSelect, ClientsContext, useClientsContext } from "@context";
import Header from "./header";
import Details from "./details";
import TopContainer from "./topContainer";
import Dialogs from "./dialogs";

const Clients = (props) => {
  const { reload, useSearch, ...other } = useGet(50, 1);

  return (
    <>
      <Table
        {...other}
        userContext={ClientsSelect}
        topContainer={(props) => (
          <TopContainer {...props} onSearch={useSearch} />
        )}
        itemsRender={{
          header: (props) => <Header {...props} />,
          details: (props) => <Details {...props} />,
        }}
        showCheck
      />
      <Dialogs useContext={useClientsContext} reload={reload} />
    </>
  );
};

const Main = memo((props) => {
  return (
    <ClientsSelect.Provider value={[]} name="SELECT FOR TABLE Clients">
      <ClientsContext>
        <Clients />
      </ClientsContext>
    </ClientsSelect.Provider>
  );
}, areEqualAlways);

const Default = (props) => {
  return <Main />;
};

export default { name: "Clients", component: Default };

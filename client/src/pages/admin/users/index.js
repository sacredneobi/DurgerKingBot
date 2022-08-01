import { memo } from "react";
import { Table } from "@components";
import { useUsersGet as useGet } from "@api";
import { areEqualAlways } from "@utils/areRender";
import {
  UsersSelect as Select,
  UsersContext as Context,
  useUsersContext as useContext,
} from "@context";
import Header from "./header";
import Details from "./details";
import TopContainer from "./topContainer";
import Dialogs from "./dialogs";

const Main = (props) => {
  const { reload, useSearch, ...other } = useGet(50, 0);

  return (
    <>
      <Table
        {...other}
        userContext={Select}
        topContainer={(props) => (
          <TopContainer {...props} onSearch={useSearch} />
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
    <Select.Provider value={[]} name="SELECT FOR TABLE USERS">
      <Context>
        <Main />
      </Context>
    </Select.Provider>
  );
}, areEqualAlways);

export default { name: "users", component: Default };

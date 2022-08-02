import { memo } from "react";
import { Table } from "@components";
import { useUsersGet as useGet } from "@api";
import { areEqualAlways } from "@utils";
import {
  UsersContext as Context,
  useUsersContext as useContext,
  useContextSelect,
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
        userContext={useContextSelect}
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
    <Context>
      <Main />
    </Context>
  );
}, areEqualAlways);

export default { name: "users", component: Default };

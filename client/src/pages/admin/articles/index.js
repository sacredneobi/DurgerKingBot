import { memo } from "react";
import { Table } from "@components";
import { useArticleGet } from "@api";
import { areEqualAlways } from "@utils/areRender";
import { SelectArticles, ArticlesContext, useArticlesContext } from "@context";
import Header from "./header";
import Details from "./details";
import TopContainer from "./topContainer";
import Dialogs from "./dialogs";

const Articles = (props) => {
  const { reload, useSearch, ...other } = useArticleGet(50, 1);

  return (
    <>
      <Table
        {...other}
        userContext={SelectArticles}
        topContainer={(props) => (
          <TopContainer {...props} onSearch={useSearch} />
        )}
        itemsRender={{
          header: (props) => <Header {...props} />,
          details: (props) => <Details {...props} />,
        }}
        showCheck
      />
      <Dialogs useContext={useArticlesContext} reload={reload} />
    </>
  );
};

const Default = memo((props) => {
  return (
    <SelectArticles.Provider value={[]} name="SELECT FOR TABLE Articles">
      <ArticlesContext>
        <Articles />
      </ArticlesContext>
    </SelectArticles.Provider>
  );
}, areEqualAlways);

export default { name: "Articles", component: Default };

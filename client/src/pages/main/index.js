import { useSearchParams } from "react-router-dom";
import Goods from "../goods";
import Article from "../articles";

const Default = (props) => {
  const [searchParams] = useSearchParams();

  return searchParams.get("articleId") ? (
    <Goods articleId={searchParams.get("articleId")} />
  ) : (
    <Article />
  );
};

export default Default;

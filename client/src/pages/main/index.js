import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Box } from "../../components";
import Goods from "../goods";
import Article from "../articles";
import Payment from "../payment";

const Default = (props) => {
  const [searchParams] = useSearchParams();
  const [showPayment, setShowPayment] = useState(true);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        alignItems: "center",
      }}
    >
      {searchParams.get("articleId") ? (
        <Goods
          articleId={searchParams.get("articleId")}
          showPayment={showPayment}
          setShow={setShowPayment}
        />
      ) : (
        <Article showPayment={showPayment} setShow={setShowPayment} />
      )}
      <Payment show={showPayment} setShow={setShowPayment} />
    </Box>
  );
};

export default Default;

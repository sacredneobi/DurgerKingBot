import { useState, useContext, memo } from "react";
import { Badge, Box, Text, Avatar, Icon } from "../../components";
import { Skeleton } from "@mui/material";
import {
  rootContainerButton,
  rootContainer,
  rootTypography,
  containerButton,
} from "./styles";
import { useSearchParams } from "react-router-dom";
import Button from "../addons/grid/button";
import { ShoppingCart } from "../../context";
import { convertToPrice } from "../../utils";
import { useLottie } from "lottie-react";

const findItem = (id, shoppingCart) => {
  const find = shoppingCart.filter((itemCart) => itemCart.id === id);

  return { isFind: find.length > 0, item: find.length > 0 ? find[0] : null };
};

const finCountDef = (id, shoppingCart) => {
  const data = findItem(id, shoppingCart);
  return data.item?.count ? data.item.count : 0;
};

const setItemCount = (id, shoppingCart, count, sale) => {
  const find = shoppingCart.filter((itemCart) => itemCart.id === id);
  if (find.length > 0) {
    find.forEach((item) => {
      item.count = count;
      item.sale = sale;
    });
  } else {
    shoppingCart.push({ id, count, sale });
  }
};

function areEqual(prev, next) {
  return (
    prev.id === next.id &&
    prev.type === next.type &&
    prev.icon === next.icon &&
    prev.caption === next.caption &&
    prev.showShoppingCart === next.showShoppingCart
  );
}

const Default = memo((props) => {
  const {
    caption,
    icon,
    loading,
    type,
    id,
    showShoppingCart,
    price: { sale = 0.0 } = {},
  } = props;

  const shoppingCart = useContext(ShoppingCart);
  const [counter, setCounter] = useState(finCountDef(id, shoppingCart));
  const [searchParams, setSearchParams] = useSearchParams();
  const { View, goToAndPlay } = useLottie(
    {
      animationData: icon.isAnimate ? icon.img : null,
      loop: false,
      autoplay: false,
    },
    { height: 80 }
  );

  const isNotBack = type !== "back";

  const handleOnClickAnimation = () => {
    if (icon.isAnimate) {
      goToAndPlay(0);
    }
  };

  const handleOnClick = (add) => () => {
    setCounter((prev) => {
      const count = add ? prev + 1 : prev - 1 < 0 ? 0 : prev - 1;
      setItemCount(id, shoppingCart, count, sale);
      if (typeof showShoppingCart === "function") {
        showShoppingCart(true, false);
      }
      if (icon.isAnimate && count > 0) {
        goToAndPlay(0);
      }
      return count;
    });
  };

  const handleOnClickBack = () => {
    setSearchParams(
      searchParams.get("pageArticle")
        ? {
            pageArticle: searchParams.get("pageArticle"),
          }
        : {}
    );
  };

  const isZero = counter === 0;

  if (loading) {
    return <Skeleton variant="rectangular" width="100%" height="200px" />;
  }

  if (isNotBack) {
    return (
      <Box sx={rootContainer}>
        <Badge counter={counter}>
          {icon.isAnimate ? (
            <div onClick={handleOnClickAnimation}>{View}</div>
          ) : (
            <Avatar src={icon.img} sizeImage={80} />
          )}
        </Badge>
        <Box
          sx={{
            marginTop: 1,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text {...rootTypography} caption={caption} />
          <Text
            {...rootTypography}
            sx={{ fontWeight: "bold" }}
            caption={convertToPrice(sale)}
          />
        </Box>
        <Box sx={rootContainerButton}>
          <Button
            textIcon="remove"
            onClick={handleOnClick(false)}
            sx={containerButton(isZero)}
          />
          <Button
            textIcon={isZero ? "local_mall" : "add"}
            onClick={handleOnClick(true)}
            sx={containerButton(isZero, true)}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{ ...rootContainer, justifyContent: "center" }}
      onClick={handleOnClickBack}
    >
      <Icon
        textIcon="reply"
        sx={{ height: 80, width: 80, fontSize: 77, color: "#bda1a1" }}
      />
    </Box>
  );
}, areEqual);

export default Default;

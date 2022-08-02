import { useState, useContext, memo } from "react";
import { Badge, Box, Text, Avatar, Skeleton, Button } from "@components";
import { ShoppingCart } from "@context";
import {
  rootContainerButton,
  rootContainer,
  rootTypography,
  containerButton,
  textContainer,
} from "./styles";
import { useLottie } from "lottie-react";
import { finCountDef, setItemCount, areEqual } from "./utils";
import { isFunc, convertToPrice } from "@utils/";

const Default = memo((props) => {
  const {
    caption,
    icon,
    loading,
    id,
    showShoppingCart,
    price: { sale = 0.0 } = {},
  } = props;

  const shoppingCart = useContext(ShoppingCart);
  const [counter, setCounter] = useState(finCountDef(id, shoppingCart));
  const { View, goToAndPlay } = useLottie(
    {
      animationData: icon.isAnimate ? icon.img : null,
      loop: false,
      autoplay: false,
    },
    { height: 80 }
  );

  const handleOnClickAnimation = () => {
    goToAndPlay(0);
  };

  const handleOnClick = (add) => () => {
    setCounter((prev) => {
      const count = add ? prev + 1 : prev - 1 < 0 ? 0 : prev - 1;
      setItemCount(id, shoppingCart, count, sale, caption);
      isFunc(showShoppingCart, true, false);
      if (icon.isAnimate && count === 1) {
        handleOnClickAnimation();
      }
      return count;
    });
  };

  const isZero = counter === 0;

  if (loading) {
    return <Skeleton />;
  }

  return (
    <Box sx={rootContainer}>
      <Badge counter={counter}>
        {icon.isAnimate ? (
          <div onClick={handleOnClickAnimation}>{View}</div>
        ) : (
          <Avatar src={icon.img} sizeImage={80} />
        )}
      </Badge>
      <Box sx={textContainer}>
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
}, areEqual);

export default Default;

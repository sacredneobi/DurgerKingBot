import { Box, Avatar, Badge, Divider, Skeleton, Text } from "@components";
import { bottle } from "../../res/icons";
import { useGoodGetById as useGetById } from "@api";
import { convertToPrice } from "@utils";
import styles from "./styles";

const MyText = (props) => {
  const { caption, ...other } = props;
  return (
    <Text
      caption={caption}
      variant="caption"
      display="block"
      gutterBottom
      {...other}
    />
  );
};

const Default = (props) => {
  const { count, isLast, id, sale = 0.0 } = props;
  const { item, loading } = useGetById(id);

  return (
    <>
      <Box sx={styles.rootItem}>
        {loading ? (
          <Skeleton width="100%" height={80} />
        ) : (
          <>
            <div style={styles.containerItem}>
              <Badge counter={count}>
                <Avatar src={bottle} sizeImage={80} />
              </Badge>
            </div>
            <Box sx={styles.containerGood}>
              <Box>
                <MyText
                  caption={item.caption}
                  variant="subtitle2"
                  component="div"
                />
              </Box>
              <Box>
                <MyText caption={item.description} />
                <MyText caption={item.description} />
                <MyText caption={item.description} />
              </Box>
            </Box>
            <Box>
              <Text
                caption={convertToPrice(sale * count)}
                noWrap
                sx={styles.goodPrice}
              />
            </Box>
          </>
        )}
      </Box>
      {!isLast && <Divider flexItem />}
    </>
  );
};

export default Default;

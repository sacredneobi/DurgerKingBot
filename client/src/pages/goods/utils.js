const findItem = (id, shoppingCart) => {
  const find = shoppingCart.filter((itemCart) => itemCart.id === id);
  return { isFind: find.length > 0, item: find.length > 0 ? find[0] : null };
};

const finCountDef = (id, shoppingCart) => {
  const data = findItem(id, shoppingCart);
  return data.item?.count ? data.item.count : 0;
};

const setItemCount = (id, shoppingCart, count, sale, caption) => {
  const find = shoppingCart.filter((itemCart) => itemCart.id === id);
  if (find.length > 0) {
    find.forEach((item) => {
      item.count = count;
      item.sale = sale;
      item.caption = caption;
    });
  } else {
    shoppingCart.push({ id, count, sale, caption });
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

export { findItem, finCountDef, setItemCount, areEqual };

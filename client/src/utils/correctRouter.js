const findRoute = (name = "", pages = []) => {
  const find = pages.filter(
    (item) => item?.name?.toUpperCase() === name.toUpperCase()
  );
  return find.length > 0 ? find[0] : null;
};

const def = (items, pages) => {
  if (!items) {
    return [];
  }
  return items
    .map((item) => {
      if (typeof item === "object") {
        let data = { ...item };
        const page = findRoute(item.name, pages);
        if (page) {
          data.component = page.component;
        }

        return data;
      }
      return null;
    })
    .filter((item) => !!item);
};

export default def;

import { useState, useEffect, useCallback } from "react";
import useAxios from "axios-hooks";
import {
  burger,
  cake,
  coke,
  cookie,
  donut,
  flan,
  fries,
  hotdog,
  pizza,
} from "../res/icons";

const img = [
  burger,
  cake,
  coke,
  cookie,
  donut,
  flan,
  fries,
  hotdog,
  pizza,
  cookie,
  donut,
  flan,
  fries,
  hotdog,
  pizza,
  coke,
];

const useGet = (countPerPage = 0) => {
  const [countPage, setCountPage] = useState(0);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const [{ data, loading }] = useAxios(
    `/api/goods?limit=${countPerPage}&offset=${
      page * (countPerPage ? countPerPage : 0)
    }`
  );

  useEffect(() => {
    if (data) {
      setCountPage(
        Math.ceil(
          (data?.count ? data.count : 0) / (countPerPage ? countPerPage : 0)
        )
      );
      setItems(
        data.rows
          ? data.rows.map((item, index) => ({ ...item, icon: img[index] }))
          : []
      );
    }
  }, [data]);

  const usePage = useCallback(
    (page) => {
      setPage(page ? page : 0);
    },
    [countPerPage]
  );

  return { countPage, items, loading, usePage, page };
};

export { useGet };

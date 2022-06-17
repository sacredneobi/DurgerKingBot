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
  bottle,
} from "../res/icons";

const img = [
  burger,
  cake,
  bottle,
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

const useGet = (countPerPage = 0, articleId) => {
  const [countPage, setCountPage] = useState(0);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(null);

  const [{ data, loading }] = useAxios(
    {
      url: `/api/goods?articleId=${articleId}&limit=${countPerPage}&offset=${
        (page - 1) * (countPerPage ? countPerPage : 0)
      }${search ? `&search=${search}` : ""}`,
    },
    { useCache: false }
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
      setPage(page ? page : 1);
    },
    [countPerPage]
  );

  const useSearch = useCallback((value) => {
    setSearch((prev) => {
      if (prev !== value) {
        setPage(1);
      }
      return value === "" ? null : value;
    });
  }, []);

  return { countPage, items, loading, usePage, page, useSearch };
};

export { useGet };

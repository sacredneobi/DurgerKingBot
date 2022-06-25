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
  { isAnimate: false, img: burger },
  { isAnimate: true, img: cake },
  { isAnimate: false, img: bottle },
  { isAnimate: false, img: cookie },
  { isAnimate: false, img: donut },
  { isAnimate: false, img: flan },
  { isAnimate: false, img: fries },
  { isAnimate: false, img: hotdog },
  { isAnimate: false, img: pizza },
  { isAnimate: false, img: cookie },
  { isAnimate: false, img: donut },
  { isAnimate: false, img: flan },
  { isAnimate: false, img: fries },
  { isAnimate: false, img: hotdog },
  { isAnimate: false, img: pizza },
  { isAnimate: false, img: coke },
];

const useGet = (countPerPage = 0, articleId) => {
  const [answer, setAnswer] = useState({ countPage: 0, items: [] });
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
      setAnswer((prev) => {
        const items = data.rows
          ? data.rows.map((item, index) => ({ ...item, icon: img[index] }))
          : [];

        // items.unshift({ id: 0, type: "back" });

        return {
          countPage: Math.ceil(
            (data?.count ? data.count : 0) / (countPerPage ? countPerPage : 0)
          ),
          items,
        };
      });
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

  return {
    countPage: answer?.countPage,
    items: answer?.items,
    loading,
    usePage,
    page,
    useSearch,
  };
};

const useGetById = (id) => {
  const [item, setItem] = useState({});

  const [{ data, loading }] = useAxios(
    {
      url: `/api/goods?id=${id}`,
    },
    { useCache: false }
  );

  useEffect(() => {
    if (data) {
      setItem(
        data.rows?.length > 0 ? { ...data.rows[0], price: "$9 999.99" } : {}
      );
    }
  }, [data]);

  return {
    item,
    loading,
  };
};

export { useGet, useGetById };

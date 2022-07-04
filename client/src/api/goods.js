import { useState, useCallback } from "react";
import { useFetch } from "use-http";
import useParamsApi from "./useParamsAPI";
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
import { isFunc } from "@utils";

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

const useGet = (countPerPage = 0, articleId, notIcon = false) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(null);
  const [update, setUpdate] = useState(false);

  const { loading, data: { count: countPage = 0, rows = [] } = {} } = useFetch(
    `/api/goods?articleId=${articleId}&limit=${countPerPage}&offset=${
      (page - 1) * (countPerPage ? countPerPage : 0)
    }${search ? `&search=${search}` : ""}`,
    {
      data: [],
    },
    [page, search, update]
  );
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

  const reload = () => {
    setUpdate((prev) => !prev);
  };

  return {
    loading,
    usePage,
    page,
    useSearch,
    reload,
    countPage: Math.ceil(countPage / (countPerPage ? countPerPage : 0)),
    items: notIcon
      ? rows
      : rows.map((item, index) => ({ ...item, icon: img[index] })),
  };
};

const useDelete = (props = {}) => {
  const { reload } = props;
  const { del, loading, response } = useParamsApi("/api/goods");
  return [
    useCallback(
      (value) => {
        del("", value).then((data) => {
          isFunc(reload);
        });
      },
      [response, del, reload]
    ),
    loading,
  ];
};

const useGetById = (id) => {
  const { loading, data } = useFetch(
    `/api/goods?id=${id}`,
    {
      data: [],
    },
    [id]
  );
  return {
    item: data.rows?.length > 0 ? { ...data.rows[0] } : {},
    loading,
  };
};

export { useGet, useGetById, useDelete };

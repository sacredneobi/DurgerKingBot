import { useState, useCallback } from "react";
import { useFetch } from "use-http";
import useParamsApi from "./useParamsAPI";

const useGetAll = () => {
  const { get, loading, response, abort } = useParamsApi("/api/articles");

  return [
    useCallback(
      (setData) => {
        get("").then((data) => {
          setData(data?.rows);
        });
      },
      [response, get]
    ),
    loading,
    abort,
  ];
};

const useGet = (countPerPage = 0, currentPage) => {
  const [page, setPage] = useState(currentPage ? currentPage : 1);
  const [search, setSearch] = useState(null);

  const { loading, data: { count: countPage = 0, rows = [] } = {} } = useFetch(
    `/api/articles?limit=${countPerPage}&offset=${
      (page - 1) * (countPerPage ? countPerPage : 0)
    }${search ? `&search=${search}` : ""}`,
    {
      data: [],
    },
    [page, search]
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

  return {
    loading,
    usePage,
    page,
    useSearch,
    countPage: Math.ceil(countPage / (countPerPage ? countPerPage : 0)),
    items: rows,
  };
};

export { useGet, useGetAll };

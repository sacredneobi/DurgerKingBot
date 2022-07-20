import { useState, useCallback } from "react";
import { useFetch } from "use-http";
import useParamsApi from "./useParamsAPI";
import { isFunc } from "@utils";

const urlBase = "/api/orders";

const useGetAll = () => {
  const { get, loading, response, abort } = useParamsApi(urlBase);

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
  const [update, setUpdate] = useState(false);

  const { loading, data: { count: countPage = 0, rows = [] } = {} } = useFetch(
    `${urlBase}?limit=${countPerPage}&offset=${
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
    reload,
    useSearch,
    countPage: Math.ceil(countPage / (countPerPage ? countPerPage : 0)),
    items: rows,
  };
};

const useGetById = (props = {}) => {
  const { get, loading, response } = useParamsApi(urlBase);
  return [
    useCallback(
      (id, setData) => {
        get(`?id=${id}`).then((data) => {
          if (response.ok) {
            const item = data.rows[0];
            setData(data.rows?.length > 0 ? item : {});
          }
        });
      },
      [response, get]
    ),
    loading,
  ];
};

const usePost = () => {
  const { post, loading, response } = useParamsApi(urlBase);
  return [
    useCallback(
      (data) => {
        post("", data);
      },
      [response, post]
    ),
    loading,
  ];
};

const useUpdate = () => {
  const { put, loading, response } = useParamsApi(urlBase);
  return [
    useCallback(
      (data) => {
        put("", data);
      },
      [response, put]
    ),
    loading,
  ];
};

const useDelete = (props = {}) => {
  const { reload } = props;
  const { del, loading, response } = useParamsApi(urlBase);
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

export { useGet, useGetAll, useGetById, usePost, useUpdate, useDelete };

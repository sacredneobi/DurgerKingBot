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

const urlBase = "/api/goods";

const useGet = (countPerPage = 0, articleId, notIcon = false) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(null);
  const [update, setUpdate] = useState(false);

  const { loading, data: { count: countPage = 0, rows = [] } = {} } = useFetch(
    `${urlBase}?${
      articleId ? `articleId=${articleId}&` : ""
    }limit=${countPerPage}&offset=${
      (page - 1) * (countPerPage ? countPerPage : 0)
    }${search ? `&search=${search}` : ""}`,
    {
      data: [],
    },
    [page, search, update, articleId]
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

const useGetById2 = (props = {}) => {
  const { get, loading, response } = useParamsApi(urlBase);
  return [
    useCallback(
      (id, setData) => {
        get(`?id=${id}`).then((data) => {
          if (response.ok) {
            setData(
              data.rows?.length > 0
                ? {
                    caption: data.rows[0].caption,
                    articleId: data.rows[0].article,
                    description: data.rows[0].description,
                    price: data.rows[0].price,
                  }
                : {}
            );
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

const useGetAll = () => {
  const { get, loading, response, abort } = useParamsApi(urlBase);

  return [
    useCallback(
      (search, setData) => {
        get(`?search=${search}&limit=200`).then((data) => {
          setData(data?.rows);
        });
      },
      [response, get]
    ),
    loading,
    abort,
  ];
};

export {
  useGet,
  useGetById,
  useGetById2,
  useDelete,
  usePost,
  useUpdate,
  useGetAll,
};

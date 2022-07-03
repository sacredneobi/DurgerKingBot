import { useCallback } from "react";
import useParamsApi from "./useParamsAPI";

const post = (data) => {
  const { post, loading, response } = useParamsApi("/api/botAnswer");
  return [
    useCallback(
      (value) => {
        post("", value).then((data) => {
          console.log(data);
          if (response.ok) {
            localStorage.removeItem("shoppingCart");
          }
        });
      },
      [response, post]
    ),
    loading,
  ];
};

export { post };

import { useCallback } from "react";
import useParamsApi from "./useParamsAPI";

const post = (data) => {
  const { post, loading, response } = useParamsApi("/api/botAnswer/senInvoice");
  return [
    useCallback(
      (value, setData) => {
        post("", value).then((data) => {
          console.log(data);
          if (response.ok) {
            localStorage.removeItem("shoppingCart");
            setData(response.data);
          }
        });
      },
      [response, post]
    ),
    loading,
  ];
};

export { post };

import { useCallback } from "react";
import useParamsApi from "./useParamsAPI";

const def = (props) => {
  const { correctRouter, adminPages } = props;
  const { get, loading, response } = useParamsApi("/api/access");

  return [
    useCallback(
      (setData) => {
        get("").then((data) => {
          setData(
            response.ok
              ? {
                  route: correctRouter(data.route, adminPages),
                  routeSetting: correctRouter(data.routeSetting, adminPages),
                }
              : null
          );
        });
      },
      [response, get, correctRouter, adminPages]
    ),
    loading,
  ];
};

export default def;

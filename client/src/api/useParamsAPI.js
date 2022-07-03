import useFetch from "use-http";

const useParams = (url, cachePolicy, langBase, prefix) => {
  return useFetch(url, {
    cachePolicy,
    data: [],
    onAbort: () => {
      console.log("abort request");
    },
    onError: (error) => {
      console.log(error, langBase, prefix);
    },
  });
};

export default useParams;

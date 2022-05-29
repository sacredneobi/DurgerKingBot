import useAxios from "axios-hooks";

const useDef = () => {
  const [{ data, loading, error }, execute] = useAxios(
    {
      url: "/api/access",
      method: "GET",
    },
    { manual: true }
  );

  return { execute, data, loading, error };
};

export default useDef;

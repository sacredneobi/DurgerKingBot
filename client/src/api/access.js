import useAxios from "axios-hooks";

const def = () => {
  const [{ data, loading, error }, execute] = useAxios(
    {
      url: "/api/access",
      method: "GET",
    },
    { manual: true }
  );

  return { execute, data, loading, error };
};

export default def;

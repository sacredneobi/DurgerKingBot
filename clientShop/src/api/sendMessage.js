import axios from "axios";

const post = (data) => {
  axios.post("/api/", data);
};

export { post };

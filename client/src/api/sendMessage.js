import axios from "axios";

const post = (data) => {
  axios.post("/api/botAnswer", data);
  // localStorage.removeItem("shoppingCart");
};

export { post };

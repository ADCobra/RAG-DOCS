import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

export default axios;